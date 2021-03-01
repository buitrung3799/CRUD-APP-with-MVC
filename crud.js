// @class Model manage data of website

model = {
        books : 
        [
        {ID: '1' , Book_Name: 'Doraemon', Category: 'Comic' , Price: 3},
        {ID: '2' , Book_Name: 'Giao Duc Cong Dan', Category: 'SGK' , Price: 4},
        {ID: '3' , Book_Name: 'PlayBoy', Category: 'Magazine' , Price: 5}
        ],
        headerCol : [],
        category : ['Comic' , 'SGK' , 'Magazine' , 'Programming' , 'Science' , 'Football'],

    editBook: function(id , updatedName , updatedCategory , updatedPrice) {
        this.books = this.books.map(book => {
            book.id === id ? {
                id: book.id,
                Book_Name: updatedName,
                Category: updatedCategory,
                Price: updatedPrice
            } : book
        })
    },

    deleteBook: function(id) {
        this.books.splice((id - 1) , 1);
        console.log(id);
        console.log(this.books);
    }
}

//@class View

view  = {
    init() {
        console.log('render HTML here');
    },
    render: function() {
        const app = document.getElementById('container')
        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'CRUD Application with MVC';
        const table = document.createElement('table');
        table.id = 'booksTable';
        const search = document.createElement('input'); //Create Search Bar
        search.type = 'text';
        search.placeholder = 'Search...';
        search.id = 'search-bar';
        search.setAttribute('onkeyup' , 'controller.handleSearch()');
        app.append(title , search ,table);
        const col = model.headerCol;
        const books = model.books;
        const category = model.category;
        // EXTRACT VALUE FOR TABLE HEADER.
        for(let i = 0; i < books.length; i++){
            for(var key in books[i]){
                if(col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
            }
        var tr = table.insertRow(-1);
        for (let i = 0; i < col.length; i++){
            // ADD TABLE HEADER.
            var th = document.createElement('th');
            th.innerHTML = col[i].replace('_' , ' ');
            tr.appendChild(th);
        }
        // ADD ROWS USING MODEL.
        for(let i = 0; i < books.length; i++) {
            const tr = table.insertRow(-1);
            for(let j = 0; j < col.length; j++){
                const tableCell = tr.insertCell(-1);
                tableCell.innerHTML = books[i][col[j]];
            }
            this.td = document.createElement('td');
            tr.appendChild(this.td);

            //Cancel button
            const labelCancel = document.createElement('label');
            labelCancel.innerHTML = '&#10006';
            labelCancel.setAttribute('onclick' , 'controller.handleCancelEdit(this)');
            labelCancel.style.display = 'none';
            labelCancel.title = 'Cancel';
            labelCancel.id = 'label' + i;
            this.td.appendChild(labelCancel);

            //Save button
            tr.appendChild(this.td);
            const btnSave = document.createElement('input');
            btnSave.type = 'button';
            btnSave.value = 'Save';
            btnSave.id = 'Save' + i;
            btnSave.style.display = 'none';
            btnSave.setAttribute('onclick','controller.handleSaveEdit(this)');
            this.td.appendChild(btnSave);

            //Update button 
            tr.appendChild(this.td);
            const btnUpdate = document.createElement('input');
            btnUpdate.type = 'button';
            btnUpdate.value = 'Update';
            btnUpdate.id = 'Edit' + i;
            btnUpdate.style.backgroundColor = '#44CCEB';
            btnUpdate.setAttribute('onclick' ,'controller.handleEditBook(this)');
            this.td.appendChild(btnUpdate);

            //Delete button 
            this.td = document.createElement('td');
            tr.appendChild(this.td);
            const btnDelete = document.createElement('input');
            btnDelete.id = 'Delete'
            btnDelete.type = 'button';
            btnDelete.value = 'Delete';
            btnDelete.style.backgroundColor = '#ED5650';
            btnDelete.setAttribute('onclick' , 'controller.handleDeleteBook(this)');
            this.td.appendChild(btnDelete);
        }
        var tr = table.insertRow(-1);
        for (let i = 0 ; i < col.length; i++) {
            var newCell = tr.insertCell(-1);
            if(i >= 1) {
                if(i == 2){
                const select = document.createElement('select');
                select.innerHTML = '<option value=""></option>';
                for (let j = 0 ; j < category.length; j++ ) {
                    select.innerHTML = select.innerHTML + 
                    '<option value="' + category[j] + '">' + category[j] + '</option>';
                }
                    newCell.appendChild(select);
                }
                else {
                    const textBox = document.createElement('input');
                    textBox.type = 'text';
                    textBox.value = '';
                    newCell.appendChild(textBox);
                }
            }
        }
        this.td = document.createElement('td');
        tr.appendChild(this.td);

        //New button
        this.td = document.createElement('td');
        tr.appendChild(this.td);
        const btnNew = document.createElement('input');
        btnNew.type = 'button';
        btnNew.value = 'Create';
        for(let i = 0; i < books.length; i++) {
        btnNew.id = 'New' + i;
        }
        btnNew.style.backgroundColor = '#207DD1';
        btnNew.setAttribute('onclick', 'controller.handleAddBook(this)');
        this.td.appendChild(btnNew);
    },
}

controller = {
    init: function() {
        view.render();
    },
    handleDeleteBook: function(button){ //DELETE FUnction
        console.log(button);
        const activeRow = button.parentNode.parentNode.rowIndex;
        model.deleteBook(activeRow);
        this.init();
    },
    handleAddBook: function(button) { // Create New function 
        const activeRow = button.parentNode.parentNode.rowIndex;
        const table = document.getElementById('booksTable').rows[activeRow];
        const obj = {};
        for (let i = 1; i < model.headerCol.length; i++){
            const td = table.getElementsByTagName('td')[i];
            if(td.childNodes[0].getAttribute('type') === 'text' || td.childNodes[0].tagName === 'SELECT'){
                var txtValue = td.childNodes[0].value;
                if(txtValue != '') {
                    obj[model.headerCol[i]] = txtValue.trim();
                }
                else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        obj[model.headerCol[0]] = model.books.length + 1;  //push new items and refresh table
            if(Object.keys(obj).length > 0) {
                model.books.push(obj);
                this.init();
            }
    },
    handleEditBook: function(button) {
        const activeRow = button.parentNode.parentNode.rowIndex;
        const table = document.getElementById('booksTable').rows[activeRow];

        
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = table.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < model.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + model.category[k] + '">' + model.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = table.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var cancel = document.getElementById('label' + (activeRow - 1));
            cancel.style.cursor = 'pointer';
            cancel.style.display = 'block';
            cancel.style.width = '20px';
            cancel.style.float = 'left';
            cancel.style.position = 'absolute';

            var save = document.getElementById('Save' + (activeRow - 1));
            save.style.cursor = 'pointer';
            save.style.display = 'block';
            save.style.marginLeft = '30px';
            save.style.float = 'left';
            save.style.backgroundColor = '#2DBF64';

        // HIDE THIS BUTTON.
        button.setAttribute('style', 'display:none;');
    },
    handleCancelEdit: function (button) { //Cancel button
            button.style.display = 'none';
            button.style.float = 'none';
            const activeRow = button.parentNode.parentNode.rowIndex;
            var save = document.getElementById('Save' + (activeRow - 1));
            save.style.display = 'none';
            var update = document.getElementById('Edit' + (activeRow - 1));
            update.style.display = 'block';
            update.style.margin = '0 auto';
            update.style.backgroundColor = '#44CCEB';

            var tab = document.getElementById('booksTable').rows[activeRow];
            for (let i = 0; i < model.headerCol.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = model.books[(activeRow - 1)][model.headerCol[i]];
            }
    },
    handleSaveEdit: function(button){ //Save function
            var activeRow = button.parentNode.parentNode.rowIndex ;
            var table = document.getElementById('booksTable').rows[activeRow];
            for ( let i = 1; i < model.headerCol.length; i++) {
            var td = table.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute("type") == 'text' || td.childNodes[0].tagName == 'select') { 
                model.books[(activeRow - 1)][model.headerCol[i]] = td.childNodes[0].value;      
            }
        }
            this.init();
    },
    handleSearch: function(){ //Search function
            const input = document.getElementById('search-bar');
            const filter = input.value.toUpperCase();
            var table = document.getElementById('booksTable');
            var list = table.getElementsByTagName('tr');
            console.log(list);
            for (let i = 0; i < list.length; i++) {
                var item = list[i].getElementsByTagName('td')[1];
                console.log(item);
                if(item) {
                    var txtValue = item.innerText || item.textContent;
                    console.log(txtValue);
                    if(txtValue.toUpperCase().indexOf(filter) > -1) {
                        list[i].style.display = "";
                    } else {
                        list[i].style.display = 'none';
                    }
                }
                
            }
    }
}

controller.init();
