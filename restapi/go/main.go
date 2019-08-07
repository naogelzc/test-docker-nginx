package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Employee structure
type Employee struct {
	EmployeeID  int    `json:"id"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	DateOfBirth string `json:"dob"`
	PhoneNumber int    `json:"phone_number"`
}

// Replyjson structure
type Replyjson struct {
	EmployeeID  int
	FirstName   string
	LastName    string
	DateOfBirth string
	PhoneNumber int
}

// Tempemp structure
type Tempemp struct {
	Fname string `json:"FName"`
	Lname string `json:"LName"`
}

var emp []Employee
var emptyemp []Employee
var tempemp []Tempemp

//Home page
func display(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello")
}

//All employees
func getEmployees(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	//get all data
	rows, err := db.Query("SELECT * FROM public.employees")
	if err != nil {
		fmt.Print(err)
	}

	defer rows.Close()

	var tem []Employee
	for rows.Next() {
		//tempemp = append(tempemp , {EmployeeID : row,FirstName,LastName,DateOfBirth,PhoneNumber})
		var fname string
		var lname string
		var empid int
		var empdob string
		var phone int

		err := rows.Scan(&empid, &fname, &lname, &empdob, &phone)
		if err != nil {
			fmt.Print(err)
		}
		//tempemp = append(tempemp, Tempemp{Fname: fname, Lname: lname})

		tem = append(tem, Employee{EmployeeID: empid, FirstName: fname, LastName: lname, DateOfBirth: empdob, PhoneNumber: phone})
	}

	json.NewEncoder(w).Encode(tem)
}

//single employee
func getEmployee(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	id := r.PostFormValue("ID")
	// params := mux.Vars(r)

	// //get employee data
	rows, err := db.Query("SELECT * FROM public.employees where employee_id = $1", id)
	if err != nil {
		fmt.Print(err)
	}

	defer rows.Close()

	for rows.Next() {
		//tempemp = append(tempemp , {EmployeeID : row,FirstName,LastName,DateOfBirth,PhoneNumber})
		var fname string
		var lname string
		var empid int
		var empdob string
		var phone int

		err := rows.Scan(&empid, &fname, &lname, &empdob, &phone)
		if err != nil {
			fmt.Print(err)
		}
		//tempemp = append(tempemp, Tempemp{Fname: fname, Lname: lname})
		emp = emptyemp
		emp = append(emp, Employee{EmployeeID: empid, FirstName: fname, LastName: lname, DateOfBirth: empdob, PhoneNumber: phone})
		// m = Replyjson{empid, fname, lname, empdob, phone}

	}

	json.NewEncoder(w).Encode(emp)
	//fmt.Fprintf(w, "Hello world %v", id)
}

//create new employee
func createEmployee(w http.ResponseWriter, r *http.Request) {

}

//update employee
func updateEmployee(w http.ResponseWriter, r *http.Request) {

}

//delete employees
func deleteEmployee(w http.ResponseWriter, r *http.Request) {

}

// route

func routerRequest() {

	r := mux.NewRouter()

	r.HandleFunc("/", display)
	r.HandleFunc("/api/Employees", getEmployees).Methods("GET", "OPTIONS", "POST")
	r.HandleFunc("/api/Employee", getEmployee).Methods("OPTIONS", "POST")
	r.HandleFunc("/api/Employees", createEmployee).Methods("POST")
	r.HandleFunc("/api/Employees/{id}", updateEmployee).Methods("GET")
	r.HandleFunc("/api/Employees/{id}", deleteEmployee).Methods("GET")

	log.Fatal(http.ListenAndServe(":8081", r))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// databse connection

var db *sql.DB

func databasecon() {
	connStr := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=%s",
		"192.168.1.101", 5432, "postgres", "password1", "rest_api", "disable")

	var err error

	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	err = db.Ping()

	if err != nil {
		panic(err)

	}
}

func main() {

	databasecon()
	routerRequest()

}
