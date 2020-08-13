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

let database = firebase.database();
let id = 0;


var todo_works = document.getElementById('todo_sec');
var sn = document.querySelector('input');
var validd = document.querySelector('.valid');

function addtodo() {


    var todo_input = document.getElementById('todo_input').value;
    var str = todo_input.trim();
    var bt = str.split(" ").join("");
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
        id++;
        //For Adding Data in Database 
        database.ref(`/Todo Data/` + id).set({
            todo_work: todo_input
        });
        Datafromfirebase()
    }
}
// Get data from Database
function Datafromfirebase() {


    firebase.database().ref('Todo Data/' + id).once('value').then(function(snapshort) {
        var dataFromDatabase = snapshort.val().todo_work;
        //   Create Todo Item 
        var li = document.createElement('li');
        var litext = document.createTextNode(dataFromDatabase);
        todo_works.appendChild(li);
        li.appendChild(litext);
        li.setAttribute('data', id);
        // Btn1
        var btn1 = document.createElement('i');
        btn1.setAttribute('class', 'fa fa-trash');
        btn1.setAttribute('onclick', 'deleteitem(this)');
        todo_works.appendChild(btn1);
        // Btn2
        var btn2 = document.createElement('i');
        btn2.setAttribute('class', 'fa fa-pencil-square-o');
        btn2.setAttribute('onclick', 'EditItems(this)');
        todo_works.appendChild(btn2);
        // For Empty value of input field After Add into list 
        document.getElementById('todo_input').value = '';
        // Shows Delete All Button 
        document.getElementById('del_btn').classList.remove('hide');
        // Hide h2
        document.getElementById('notfound').classList.add('hide');
    });
}

function deleteitem(e) {

    //for delete single Todo-work from database
    let dd = e.previousSibling.getAttribute("data");
    database.ref('Todo Data/').child(dd).remove();
    // 
    e.previousSibling.remove();
    e.nextSibling.remove();
    e.remove();
    check();

    function check() {
        if (todo_works.innerHTML === '') {
            // Hide again Delete All Button 
            document.getElementById('del_btn').classList.add('hide');
            // Show again h2 (no item found..)
            document.getElementById('notfound').classList.remove('hide');
            id = 0;
        }
    }


}

function EditItems(s) {
    a = prompt('Edit TODO Item');
    var g = a.split(' ').join('');
    if (g == '') {
        alert('Please Do not leave this field Empty!');
    } else if (g.length <= 2) {
        alert('Please Enter more than 3 words long work!');
    } else {
        let ss = s.previousSibling;
        let sa = ss.previousSibling;
        sa.innerHTML = a;
        let bd = sa.getAttribute("data");

        // for updating in database
        let newData = {
            todo_work: a
        }
        firebase.database().ref('Todo Data/').child(bd).update(newData);
    };
}

function deleteall() {
    id = 0;
    todo_works.innerHTML = '';
    //for deleall database
    function delete_data_database() {
        firebase.database().ref('Todo Data/').remove();
    }
    delete_data_database();
    // Hide again Delete All Button 
    document.getElementById('del_btn').classList.add('hide');
    // Show again h2 (no item found..)
    document.getElementById('notfound').classList.remove('hide');
}
