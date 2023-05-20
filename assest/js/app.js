let cl = console.log;
const formContainer = document.getElementById('formContainer'),
    formList = document.getElementById('list'),
    ListContainer = document.getElementById('ListContainer'),
    updateBtn = document.getElementById('updateBtn')
    calcelBtn = document.getElementById('calcelBtn');
    submitBtn = document.getElementById('submitBtn')

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16);
    })
};

let ListArr = [];

ListArr = JSON.parse(localStorage.getItem('ListData')) || []
ListTemp(ListArr)

function ListTemp(arr) {
    let result = ''
    arr.forEach(item => {
        result +=
        `
            <div class="card mb-4 border-0">
                <div class="card-body linearGradient03"id="${item.id}">
                    <div class="row">
                        <div class="col-sm-10 p-0">
                            <div class="alert alert-info alert-dismissible fade show" role="alert">
                                <p class="font-weight-bold">${item.list}</p>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="onDeleteHandler(this)">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-2 p-0 text-right">
                            <button type="button" class="btn btn-primary" onclick="OnEditHandler(this)"><i class="fas fa-user-edit"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    ListContainer.innerHTML = result
}

const onSubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
        list: formList.value,
        id: generateUuid()
    }
    ListArr.push(obj);
    e.target.reset();
    localStorage.setItem('ListData' , JSON.stringify(ListArr))
    ListTemp(ListArr)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'List has been save',
        showConfirmButton: false,
        timer: 2000
      })
}

const OnEditHandler = (e) => {
    let editId = e.closest('.card-body').id;
    localStorage.setItem('editId' , editId)
    let getItemId = ListArr.find(eleID => eleID.id === editId);
    formList.value = getItemId.list
    updateBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none')


}

const onUpdateHandler = () => {
    let UpdateData = localStorage.getItem('editId')
    ListArr.forEach(ele => {
        if(ele.id === UpdateData){
            ele.list = formList.value
        }
    })
    localStorage.setItem('ListData' , JSON.stringify(ListArr))
    ListTemp(ListArr)
    formContainer.reset();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'List has been update',
        showConfirmButton: false,
        timer: 2000
      })
}

const onDeleteHandler = (e) => {
    let deleteItem = e.closest('.card-body').id;
    let findInd = ListArr.findIndex(ind => ind.id === deleteItem)
    ListArr.splice(findInd , 1);
    localStorage.setItem('ListData' , JSON.stringify(ListArr))
    ListTemp(ListArr)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'List has been delete',
        showConfirmButton: false,
        timer: 2000
      })
}

const OnresetHandler = () => {
    formContainer.reset()
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none')
};



formContainer.addEventListener('submit', onSubmitHandler);
updateBtn.addEventListener('click' , onUpdateHandler);
calcelBtn.addEventListener('click' , OnresetHandler)