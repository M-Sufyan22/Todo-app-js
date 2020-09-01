var firebaseConfig = {
    apiKey: "AIzaSyCLagOAMVkYnC5f31Jb5-zxVkgGKRxue9M",
    authDomain: "todo-app--js.firebaseapp.com",
    databaseURL: "https://todo-app--js.firebaseio.com",
    projectId: "todo-app--js",
    storageBucket: "todo-app--js.appspot.com",
    messagingSenderId: "1058278769750",
    appId: "1:1058278769750:web:c5caa7d9e6b621d7c967f7",
    measurementId: "G-45E6BN64EY"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let database = firebase.database().ref('Todo Data/');
let todo_works = document.getElementById('todo_sec');
let sn = document.querySelector('input');
let validd = document.querySelector('.valid');
let todo_input = document.getElementById('todo_input');
let delete_All_btn = document.getElementById('del_btn');
let notFound = document.getElementById('notfound');

database.on('child_added', function(data) {
    let todo_data = data.val().todo_work;
    //   Create Todo Item 
    let li = document.createElement('li');
    let litext = document.createTextNode(todo_data);
    todo_works.appendChild(li);
    li.appendChild(litext);
    // li.setAttribute('data', id);
    // Btn1
    var btn1 = document.createElement('i');
    btn1.setAttribute('class', 'fa fa-trash');
    btn1.setAttribute('onclick', 'deleteitem(this)');
    btn1.setAttribute('id', data.val().key);
    todo_works.appendChild(btn1);
    // Btn2
    let btn2 = document.createElement('i');
    btn2.setAttribute('class', 'fa fa-pencil-square-o');
    btn2.setAttribute('onclick', 'EditItems(this)');
    todo_works.appendChild(btn2);
    // For Empty value of input field After Add into list 
    todo_input.value = '';
    // // Shows Delete All Button 
    delete_All_btn.classList.remove('hide');
    // // Hide h2
    notFound.classList.add('hide');
});

let add_todo = document.querySelector('#add_btn');
add_todo.addEventListener('click', function() {

    let str = todo_input.value.trim();
    let bt = str.split(" ").join("");
    if (bt === '') {
        sn.focus();
        sn.style.outline = '1px solid red'
        sn.style.border = '1px solid red'
        validd.style.display = 'block';
        validd.innerHTML = 'Please Do not leave this field Empty!';
    } else if (bt.length < 3) {
        sn.focus();
        sn.style.outline = '1px solid red'
        sn.style.border = '1px solid red'
        validd.style.display = 'block';
        validd.innerHTML = 'Please Enter more than 3 words long work!';
    } else {
        validd.style.display = 'none';
        sn.style.outline = 'none'
        sn.style.border = '2px solid rgb(43, 181, 245)'
        let key = database.push().key;
        let todos = {
            key: key,
            todo_work: todo_input.value
        }
        firebase.database().ref('Todo Data/').child(key).set(todos);
    };
});


function deleteitem(e) {
    //for delete single Todo-work from database
    firebase.database().ref('Todo Data/').child(e.id).remove();

    e.previousSibling.remove();
    e.nextSibling.remove();
    e.remove();
    check();

    function check() {
        if (todo_works.innerHTML === '') {
            // Hide again Delete All Button
            delete_All_btn.classList.add('hide');
            // Show again h2(no item found..)
            notFound.classList.remove('hide');
        }
    }
}

function EditItems(s) {
    a = prompt('Edit TODO Item');
    let g = a.split(' ').join('');
    if (g == '') {
        alert('Please Do not leave this field Empty!');
    } else if (g.length <= 2) {
        alert('Please Enter more than 3 words long work!');
    } else {
        let ss = s.previousSibling;
        let sa = ss.previousSibling;
        sa.innerHTML = a;
        // for updating in database
        let newData = {
            key: ss.id,
            todo_work: a
        }
        console.log(newData);
        console.log(ss.id)
        firebase.database().ref('Todo Data/').child(ss.id).update(newData);
    };
}

delete_All_btn.addEventListener('click', function() {

    todo_works.innerHTML = '';
    //for deleall database
    firebase.database().ref('Todo Data/').remove();
    // Hide again Delete All Button 
    this.classList.add('hide');
    // Show again h2 (no item found..)
    notFound.classList.remove('hide');
});
