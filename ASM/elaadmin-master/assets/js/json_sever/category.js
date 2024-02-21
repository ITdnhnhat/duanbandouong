const categoriesApi = 'http://localhost:4000/categories';

const getCategories = (callback) => {
    fetch(categoriesApi)
        .then(response => response.json())
        .then(callback);
};
// const allButton = document.getElementsByTagName('button');
// console.log(allButton);
// hàm xử lý phương thức

// show danh mục
const renderCategories = (categories) => {
    const listCategoryBlock = document.querySelector('#list-categories');
    const htmls = categories.map(function (cate) {
        return `
        
            <tr class="item-cate-${cate.id}">
                <td class="text-center text-uppercase">${cate.name}</td>
                <td class="text-center text-uppercase">${cate.description}</td>
                
                <td class="text-center">
                <button 
                    type="submit" 
                    class="btn btn-success edit-btn" 
                    data-toggle="modal" 
                    data-target="#editModal${cate.id}"
                    data-id="${cate.id}"
                >
                    Sửa
                </button>
                <!-- Modal -->
                <div class="modal fade" id="editModal${cate.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">CUSTOM CATEGORY</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <form>
                      <div class="form-group">
                        <label for="nameCat" class="col-form-label">Tên danh mục</label>
                        <input type="text" class="form-control" id="nameCat${cate.id}" value="${cate.name}">
                      </div>
                      <div class="form-group">
                        <label for="img" class="col-form-label">Mô tả</label>
                        <input type="text" class="form-control" id="desCat${cate.id}" value="${cate.description}"></input>
                      </div>
                    </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="saveBtn(${cate.id});">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </td>

                <td class="text-center">
                    <button type="submit" class="btn btn-danger" onclick="deleteCate(${cate.id})" name="remove">Xóa</button>
                </td>
            </tr>
        `;
    });
    listCategoryBlock.innerHTML = htmls.join('');
}

// phương thức sửa danh mục
// đây nè
const editCategory = async (data, callback) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(categoriesApi + '/' + data._id, options)
        .then(response => response.json())
        .then(callback)
}

// hàm sửa danh mục
const saveBtn = (id) => {
    const newName = document.querySelector(`#nameCat${id}`).value;
    const newDes = document.querySelector(`#desCat${id}`).value;
    const formSave = {
        _id: id,
        name: newName,
        description: newDes
    }
    editCategory(formSave, () => {
        getCategories(renderCategories);
    });
}
//sự kiện sửa danh mục

// phương thức thêm danh mục
const createCate = (data, callback) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(categoriesApi, options)
        .then(response => response.json())
        .then(callback)
}

// sự kiện thêm danh mục
const create = () => {
    // Note: element newName là trong modal => Lưu xong modal đóng sẽ k lấy được element newName
    const name = document.querySelector('#newName').value;
    const description = document.querySelector('#newdes').value;

    const formCate = {
        name,
        description
    };
    createCate(formCate, () => {
        getCategories(renderCategories);
    });

}
// sự kiện xóa
const deleteCate = (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(categoriesApi + '/' + id, options)
        .then(response => response.json())
        .then(() => {
            const cateItem = document.querySelector('.item-cate-' + id);
            if (cateItem) {
                cateItem.remove();
            }
        })
}
// hàm xử lý thêm danh mục
const start = () => {
    getCategories(renderCategories);
}
start();   
