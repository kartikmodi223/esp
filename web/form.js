
const education = document.getElementById('main');
const add = document.getElementById('add_field');

add.addEventListener('click', function () {
    const item = document.createElement('tr');
    item.classList.add('sub');
    item.innerHTML = `
    <tr>
            <td>
                <input type="text" id="coursename" name="coursename" placeholder="coursename">
            </td>
            <td>
                <input type="text" id="pass_year" name="pass_year" placeholder="passing year">
            </td>
            <td>
                <input type="text" id="board_name" name="board_name" placeholder="board naem">
            </td>

            <td>
                <input type="text" id="percentage" name="percentage" placeholder="percentage">
            </td>
           
        </tr>
    `;
    education.appendChild(item);
})


const language = document.getElementById('language');
const language1 = document.getElementById('l_add_field');

add.addEventListener('click', function () {
    const language1 = document.createElement('tr');
    language1.classList.add('known_language');
    language1.innerHTML = `
    <tr>
                <td>
                <input type="text" id="language">
                </td>
                <td>
                    <input type="checkbox" id="language">
                </td>
                <td>
                    can speak :
                    <input type="checkbox">
                    can write:
                    <input type="checkbox">
                    can read :
                    <input type="checkbox">
                </td>
              
            <tr>

    `;
    language.appendChild(language1);
})

const exp = document.getElementById('maine');
const add1 = document.getElementById('e_add_field');

add1.addEventListener('click', function () {
    const item2 = document.createElement('tr');
    item2.classList.add('sube');
    item2.innerHTML = `
    <tr>
    <td>
        company_name : <input type="text" id="company_name" name="cname">
    </td>
    <td>
        designation : <input type="text" id="designation" name="designation">
    </td>
    <td>
        start date : <input type="date" id="start_date" name="start_date">
    </td>
    <td>
        end date : <input type="date" id="end_date" name="end_date">
    </td>
   
</tr>
    `;
    exp.appendChild(item2);
})

function validate() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var department = document.getElementById("sub").value;
}