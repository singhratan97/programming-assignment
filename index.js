const container = document.getElementById('container')
const button = document.getElementById('search-button')
const searchBar = document.getElementById('search-bar')

fetch("./data.json")
.then(response => {
   return response.json();
})
.then(employees => {
    function employeeDetails (employeeName) {
       
        const currentEmployee = employees.filter(function(employee) {
            if(employee.employeName.toLowerCase() === employeeName.toLowerCase()) {
                return employee
            }
        })

        if (currentEmployee.length === 0) {
            return `<h2>Employee doesn't exist</h2>`
        }
       
        const current = currentEmployee.map(function(currentEmployeeDetails) {
            const {date, checkinTime, checkouttime} = currentEmployeeDetails
            const date1 = new Date(`${date} ${checkinTime}`)
            const date2 = new Date(`${date} ${checkouttime}`)
            return `
                <tr>
                    <td>${date}<//td>
                    <td>${checkinTime}</td>
                    <td>${checkouttime}</td>
                    <td>${(date2-date1)/3600000}</td>
                </tr>
              `  
        }).join('')

        return `
            <h2>Employee name : ${currentEmployee[0].employeName}</h2>
            <h3>Department : ${currentEmployee[0].dept}</h3>
            <table>
            <tr>
            <th>Date</th>
            <th>In time</th>
            <th>Out time</th>
            <th>No. of hours worked</th>
            </tr>
            ${current}
            </table>
        `
    }

    button.addEventListener('click',function(){
        if(!searchBar.value)
        {
            container.innerHTML = `<h2>Enter employee name</h2>`   
        }
        else
        container.innerHTML = employeeDetails(searchBar.value)
    })

})
.catch(() => {
    container.innerHTML = `<h2>Employee doesn't exist</h2>`
})
