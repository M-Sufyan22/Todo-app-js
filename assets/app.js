function addtodo() {
    var todo_input = document.getElementById('todo_input').value;
    var todo_works = document.getElementById('todo_sec');

    if (todo_input == '') {
        var a = document.querySelector('input');
        a.focus();
        alert('Please Do not leave this field Empty!');
    } else {
        // Shows Delete All Button 
        document.getElementById('del_btn').classList.remove('hide');
        // Hide h2
        document.getElementById('notfound').classList.add('hide');
        // Todo Item 
        var li = document.createElement('li');
        var litext = document.createTextNode(todo_input);
        todo_works.appendChild(li);
        li.appendChild(litext);
        // Btn1
        var btn1 = document.createElement('i');
        btn1.setAttribute('class', 'fa fa-trash');
        btn1.setAttribute('onclick', 'deleteitem(this)');
        todo_works.appendChild(btn1);
        // Btn2
        var btn2 = document.createElement('i');
        btn2.setAttribute('class', 'fa fa-pencil-square-o');
        btn2.setAttribute('onclick', 'edititem(this)');
        todo_works.appendChild(btn2);
        // For Empty value of input field After Add into list 
        document.getElementById('todo_input').value = '';
    }

}

function deleteitem(e) {
    e.previousSibling.remove();
    e.nextSibling.remove();
    e.remove();
    var todo_works = document.getElementById('todo_sec');

    check();

    function check() {
        if (todo_works.innerHTML == '') {
            // Hide again Delete All Button 
            document.getElementById('del_btn').classList.add('hide');
            // Show again h2 (no item found..)
            document.getElementById('notfound').classList.remove('hide');
        }
    }

}

function edititem(f) {
    a = prompt('Edit TODO Item');
    if (a !== '') {
        var todo_works = document.querySelector('#todo_sec li');
        f = todo_works;
        f = a;
        todo_works.innerHTML = f;
        console.log(f)
    }
}

function deleteall() {
    var todo_works = document.getElementById('todo_sec');
    todo_works.innerHTML = '';
    // Hide again Delete All Button 
    document.getElementById('del_btn').classList.add('hide');
    // Show again h2 (no item found..)
    document.getElementById('notfound').classList.remove('hide');
}