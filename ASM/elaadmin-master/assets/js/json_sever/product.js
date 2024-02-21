const productAPI = 'http://localhost:4000/product';

const getproducts = (callback) => {
    fetch(productAPI)
    .then(response => response.json())
    .then(callback);
}
// ham goi categori
const getCategoriesList = async () =>{
    try{
        const response = await fetch("http://localhost:4000/categories");
        const data = await response.json();
        return data;
    }catch (error){
        console.log({error});
    }
}
// gọi hàm product
const getProducts = async () =>{
    try{
        const response = await fetch("http://localhost:4000/product");
        const data = await response.json();
        return data;
    }catch (error){
        console.log({error});
    }
}

// render danh sachs category edit product
const renderCategoryList = async (categories,product) =>{
    const selectCatAdd = document.querySelector(`#select-cat${product.id}`);

  // Xóa nội dung hiện tại của danh sách
  selectCatAdd.innerHTML = '';

  // Tạo các phần tử HTML cho từng danh mục và thêm vào danh sách
  categories.forEach(category => {
    var optionElement = document.createElement('option');
    optionElement.value = category.id   ;
    optionElement.textContent = category.name;
    selectCatAdd.appendChild(optionElement);
  });
}

// render cate ra them product
const renderCategoryListadd = async (categories,product) =>{
    const selectCatAdd = document.querySelector('#select-cat-add');

  // Xóa nội dung hiện tại của danh sách
  selectCatAdd.innerHTML = '';

  // Tạo các phần tử HTML cho từng danh mục và thêm vào danh sách
  categories.forEach(category => {
    var optionElement = document.createElement('option');
    optionElement.value = category.id   ;
    optionElement.textContent = category.name;
    selectCatAdd.appendChild(optionElement);
  });
}



const renderProduct = (product) => {
    const listProductBlock = document.querySelector('#productList');
    
    const htmls = product.map(function(products){
        return `
        <tr class="item-list-${products.id}">
            <td class="text-center">
                ${products.id}
            </td>

            <td class="text-center">
                ${products.name}
            </td>

            <td class="text-center">
                <img 
                    src="/upload/images/${products.images}"
                    class="img-in-table width="50px" height="40px">
                </img>
            </td>

            <td class="text-center" >
                ${products.price}
            </td>

            <td class="text-center">
                ${products.description}
            </td>

            <td class="text-center">
                ${products.loai}
            </td>

            <td class="text-center">
                <button 
                type="submit" 
                class="btn btn-success" 
                name="edit" 
                data-id="${products.id}"  
                data-toggle="modal" 
                data-target="#editModal${products.id}"
                >
                    Sửa
                </button>
                <div class="modal fade" id="editModal${products.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">CUSTOM PRODUCT</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="nameCat" class="col-form-label">Tên Sản phẩm</label>
                                <input type="text" class="form-control" id="name${products.id}" value="${products.name}">
                            </div>
                            <div class="form-group">
                                <label for="img" class="col-form-label">URL ảnh</label>
                                <input type="text" class="form-control" id="img${products.id}" value="${products.images}"></input>
                            </div>
                            <div class="form-group">
                                <label for="img" class="col-form-label">Giá</label>
                                <input type="text" class="form-control" id="price${products.id}" value="${products.price}" placeholder="$"></input>
                            </div>
                            <div class="form-group">
                                <label for="img" class="col-form-label">Mô tả</label>
                                <textarea type="text-" class="form-control" id="des${products.id}" value="${products.description}" rows="2">${products.description}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="img" class="col-form-label">Loại</label>
                                <select class="custom-select" id="select-cat${products.id}">
                                    
                                </select>
                            </div>                            
                        </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="saveBtn(${products.id});">Save changes</button>
                        </div>
                    </div>
                    </div>
                </div>      
            </td>
            <td class="text-center">
                <button type="submit" class="btn btn-danger" onclick="deleteBtn(${products})">Xóa</button>
            </td>
        </tr>
        `;
    });
    listProductBlock.innerHTML = htmls.join('');
}

//edit product
const editProductItem = (data,callback) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(productAPI + '/' + data._id, options)
        .then(response => response.json())
        .then(callback)
}

const saveBtn = (id) => {
    const newName = document.querySelector(`#name${id}`).value;
    const newDes = document.querySelector(`#des${id}`).value;
    const newImg = document.querySelector(`#img${id}`).value;
    const newPrice = document.querySelector(`#price${id}`).value;
    const newLoai = document.querySelector(`#select-cat${id}`).value
    console.log({newName,newDes,newImg,newPrice});
    
    const formEdit = {
        _id: id,
        name: newName,
        images: newImg,
        description: newDes,
        loai: newLoai,
        price: newPrice
    }
    editProductItem(formEdit,()=>{
        getproducts(renderProduct);
    })
    
}

// delete list product
const deleteBtn = (id) =>{
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(productAPI + '/' + id,options)
    .then(response => response.json())
    .then(() =>{
        const productItem = document.querySelector('.item-list-'+ id);
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if(confirmDelete){
            productItem.remove();
        }
    });
}

// add product
const createProduct = (data, callback) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(productAPI, options)
        .then(response => response.json())
        .then(callback)
}

    
const addBtn = () => {
    const newName = document.querySelector('#newName').value;
    const newImg = document.querySelector('#newImg').value;
    const newPrice = document.querySelector('#newPrice').value;
    const newDes = document.querySelector('#newDes').value;
    const select = document.querySelector('#select-cat-add').value;
    
    const formAddProduct = {
        name: newName,
        images: newImg,
        description: newDes,
        price: newPrice,
        loai: select
    };
    console.log({formAddProduct});
    createProduct(formAddProduct, () =>{
        getproducts(renderProduct);
        
    })
}

getProducts().then(data => {
    getCategoriesList().then(cates => {
        data.map((item) => renderCategoryList(cates,item))
        data.map((item) => renderCategoryListadd(cates,item))
    });
})


const start = () =>{
    getproducts(renderProduct);
    // createProduct();
}
start();
