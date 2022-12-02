const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const login = $('.login');
const register = $('.register');
const headerRightS = $('.header-right span');
const headerAccount = $('.account');
const iconUser = $('.icon-user');

//login
const userLogin = $('#user-login');
const passLogin = $('#password-login');

//register
const userRegister = $('#user-register');
const warningUserReg = $('#user-register ~ span');
const fullName = $('#full-name');
const address = $('#address');
const phoneNumber = $('#phone-number');
const warningPhone = $('#phone-number ~ span');
const passRegister = $('#password-register');
const warningPassReg = $('#password-register ~ span');
const rePassword = $('#re-password');
const warningRePass = $('#re-password ~ span');

const btnLogin = $('.btn-login');
const btnRegister = $('.btn-register');
const boardRegister = $('.board-register');
const boardLogin = $('.board-login');

//form đăng ký đăng nhập
// localStorage.clear();
function textAnimation(){
  $$('.form-input label').forEach((label)=>{
    label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="transition-delay: ${idx * 20}ms">${(letter == ' ') ? '&#160' : letter}</span>`)
    .join('')
  })
}

let admin = {
  user: "admin",
  fullName: "admin",
  address: "",
  phoneNumber: "",
  pass: "12345678",
  userType: "admin"
};
// localStorage.clear();
let temp = JSON.parse(localStorage.getItem('dataUser'))
let listUser = temp !== null ? temp : [admin];
let data = localStorage.setItem('dataUser', JSON.stringify(listUser));
let formData = {
  user: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  pass: "",
  userType: "consumer"
}
function handleEvent(){
  register.onclick = ()=>{
    boardRegister.classList.remove('active');
  }
  btnRegister.onclick = ()=>{
    boardRegister.classList.add('active');
  }
  login.onclick = ()=>{
    boardLogin.classList.remove('active');
  }
  btnLogin.onclick = ()=>{
    boardLogin.classList.add('active');
  }
}

function changeForm(){
  boardLogin.classList.add('active');
  boardRegister.classList.remove('active');
}

//check đăng ký
function checkRegister(){
  $('#form-register').onsubmit = function(){
    formData.fullName = fullName.value;
    formData.address = address.value;
    if(userRegister.value === ""){
      warningUserReg.innerHTML = "Nhap user";
      userRegister.focus();
      return false;
    }else{
      warningUserReg.innerHTML = "";
      formData.user = userRegister.value;
    }
    if(phoneNumber.value.length < 10 && isNaN(phoneNumber.value)){
      warningPhone.innerHTML = "So dien thoai khong dung";
      phoneNumber.focus();
      return false;
    }else{
      warningPhone.innerHTML = "";
      formData.phoneNumber = phoneNumber.value;
    }
    if(passRegister.value.length < 8){
      warningPassReg.innerHTML = "Mat khau qua ngan";
      passRegister.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      formData.pass = passRegister.value;
    }
    if(passRegister.value != rePassword.value){
      warningPassReg.innerHTML = "Mat khau khong trung khop";
      warningRePass.innerHTML = "Mat khau khong trung khop";
      rePassword.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      warningRePass.innerHTML = "";
    }
    setAccount(formData);
    listUser.push(formData);
    localStorage.setItem('dataUser', JSON.stringify(listUser));
  }
}

//check đăng nhập
function checkLogin(){
  $('#form-login').onsubmit = function(event){
    for(let i of listUser){
      if(userLogin.value === i.user && passLogin.value === i.pass && i.userType === "admin"){
        event.preventDefault()
        window.open('./managerAcc.html', '_black');
        return true;
      }else if(userLogin.value === i.user && passLogin.value === i.pass){
        setAccount(i);
        return true;
      }
    }
    alert('Tai khoan khong ton tai');
    return false;
  }
}

//lấy tài khoản hiện tại
function setAccount(obj){
  let temp = [obj];
  localStorage.setItem('currentUser', JSON.stringify(temp));
  location.href = './index.html/'
}
let currentAccount = JSON.parse(localStorage.getItem('currentUser'));
function renderAccount(){
  if(currentAccount != null){
    headerAccount.style.display = 'none';
    headerRightS.innerHTML = currentAccount[0].fullName;
    iconUser.style.display = 'block';
    headerRightS.addEventListener('click', logOut);
  }
}

//đăng xuất
function logOut(){
  iconUser.style.display = 'none';
  headerRightS.style.display = 'none';
  headerAccount.style.display = 'flex'; 
  localStorage.setItem('currentUser', null);
  headerRightS.removeEventListener('click', logOut);
  location.reload();
}

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add('active');
}

//Product
function InitProduct(productId, brand, img, name, price){
  this.productId = productId
  this.brand = brand
  this.img = img
  this.name = name
  this.price = price
}
let productArr = [
  //***************************burger********************************
  new InitProduct("1011OO", "burger", "./assests/imgnew/burger/Burger-Flava.jpg", "burger bo", "40000"),
  new InitProduct("1111OO", "burger", "./assests/imgnew/burger/Burger-Shrimp.jpg", "burger ga", "40000"),
  new InitProduct("1211OO", "burger", "./assests/imgnew/burger/Burger-Zinger.jpg", "burger thap cam", "50000"),
  //***************************Chicken********************************
  new InitProduct("1411PO", "Chicken", "./assests/imgnew/Chicken/1-Fried-Chicken.jpg", "Dui nho", "30000"),
  new InitProduct("1511PO", "Chicken", "./assests/imgnew/Chicken/2-Fried-Chicken.jpg", "Dui vua", "35000"),
  new InitProduct("1611PM", "Chicken", "./assests/imgnew/Chicken/3-Fried-Chicken.jpg", "Dui lon", "40000"),
  new InitProduct("1711PM", "Chicken", "./assests/imgnew/Chicken/3-HW.jpg", "Canh vua", "35000"),
  new InitProduct("1811PM", "Chicken", "./assests/imgnew/Chicken/5-HW.jpg", "Canh lon", "40000"),
  new InitProduct("1912OO", "Chicken", "./assests/imgnew/Chicken/BJ.jpg", "Ga kho tieu", "45000"),
  new InitProduct("2012OO", "Chicken", "./assests/imgnew/Chicken/MOD-PHI-LE-GA-QUAY.jpg", "Ga Phi Le", "50000"),
    //***************************drink********************************
  new InitProduct("2112MO", "drink", "./assests/imgnew/drink/7Up-Can.jpg", "7 up", "10000"),
  new InitProduct("2212MO", "drink", "./assests/imgnew/drink/Aquafina-500ml.jpg", "Aquafina", "10000"),
  new InitProduct("2312PM", "drink", "./assests/imgnew/drink/milo-box-hd.jpg", "Milo", "10000"),
  new InitProduct("2412PM", "drink", "./assests/imgnew/drink/Mirinda-Orange-Can.jpg", "Mirinda", "10000"),
  new InitProduct("2512PM", "drink", "./assests/imgnew/drink/Peach-Tea.jpg", "Tra", "10000"),
  new InitProduct("2612PO", "drink", "./assests/imgnew/drink/Pepsi-Can.jpg", "Pepsi", "10000"),
  new InitProduct("2713OO", "drink", "./assests/imgnew/drink/pepsi-lime-can.jpg", "Pepsi khong duong", "10000"),
  //***************************noodle********************************
  new InitProduct("3601IP", "noodleRice", "./assests/imgnew/noodle/MY-Y-POP.jpg", "Mi y bo", "50000"),
  new InitProduct("3702IP", "noodleRice", "./assests/imgnew/noodle/MY-Y-ZINGER.jpg", "Mi y ga", "50000"),
  //***************************Rice********************************   
  new InitProduct("4600MB", "noodleRice", "./assests/imgnew/Rice/Rice-F.Chicken.jpg", "Com Ga Chien", "40000"),
  new InitProduct("4701MB", "noodleRice", "./assests/imgnew/Rice/Rice-Flava.jpg", "Com Ga Kho", "40000"),
  new InitProduct("4802MB", "noodleRice", "./assests/imgnew/Rice/Rice-Skewer.jpg", "Com Ga", "45000"),
  new InitProduct("4903MB", "noodleRice", "./assests/imgnew/Rice/Rice-Steak.jpg", "com ga", "45000"),
  new InitProduct("5004MB", "noodleRice", "./assests/imgnew/Rice/Rice-TENDERODS.jpg", "Com Ga", "50000"),
  new InitProduct("5105MB", "noodleRice", "./assests/imgnew/Rice/Rice-Teriyaki.jpg", "Com Ga", "50000"),
  //**************************Snack******************************** 
  new InitProduct("5901LK", "Snack", "./assests/imgnew/Snack/1-eggtart.jpg", "egg", "20000"),
  new InitProduct("6204LK", "Snack", "./assests/imgnew/Snack/2-Pumcheese.jpg", "pum", "20000"),
  new InitProduct("6305LK", "Snack", "./assests/imgnew/Snack/2-Skewers.jpg", "Skewer", "20000"),
  new InitProduct("6406LK", "Snack", "./assests/imgnew/Snack/2-Tenderods.jpg", "Tender", "20000"),
  new InitProduct("6507LK", "Snack", "./assests/imgnew/Snack/3-Fishsticks.jpg","Fish", "20000"),
  new InitProduct("6507LK", "Snack", "./assests/imgnew/Snack/3-Mashies-Vegie.jpg","Mashies", "20000"),
  new InitProduct("6507LK", "Snack", "./assests/imgnew/Snack/4-Chewy-Cheese.jpg","Chewy", "20000"),

	];
localStorage.setItem("listProduct", JSON.stringify(productArr));
function handleString(string){
  if(string.slice(2,) === "PM"){
    return "PM";
  }else if(string.slice(2,) === "PO"){
    return "PO";
  }else if(string.slice(2,) === "OO"){
    return "OO";
  }else if(string.slice(2,) === "MO"){
    return "MO";
  }else {
    return -1;
  }
}
let listTemp;
function innerProducts(brand, key = "NO"){
  let list = [];
  let code = handleString(key);
  JSON.parse(localStorage.getItem("listProduct")).forEach(function(value){
    if(value.brand === brand && key === "NO"){
      list.push(value);
    }else if(value.brand === brand){
      if(key.slice(0, 2) == value.productId.slice(2, 4)){
        if(code == -1){
          list.push(value);
        }else if(code === value.productId.slice(4, )){
          list.push(value);
        }
      }
    }
  });
  listTemp = list;
  dividePage(list);
  showContent(list);
  $('.slider').style.display = "block";
  $('.innerLable').style.display = "block";
  $('.page').style.display = "block";
}

function dividePage(arr){
  let pages = Math.ceil(arr.length / 8);
  let s = "";
  if(pages > 1){
    for(let i = 1; i <= pages;i++){
      s += `<li onclick="innerPage('${i}')">${i}</li>`;
      $('.page').innerHTML = `<ul>${s}</ul>`;
    }
  }else{
    $('.page').innerHTML = "";
  }
}
function innerPage(currentPage){
  let count = 0;
  let temp = [];
  let page = (currentPage - 1) * 8;
  for(let i = page;count < 8 && count < listTemp.length - page; i++){
    temp.push(listTemp[i]);
    count++;
  }
  showContent(temp);
}
function showContent(arr){
  let s = "";
  let count = 0;
  let header;
  if(arr[0].brand == "burger"){
    header = `
      <div class="lable">
        <h1>Burger</h1>
      </div>
    `;
  }else if(arr[0].brand == "Chicken"){
    header = `
      <div class="lable">
        <h1>Gà rán</h1>
      </div>
    `;
  }else if(arr[0].brand == "noodleRice"){
    header = `
      <div class="lable">
        <h1>Mì và cơm</h1>
      </div>
    `;
  }else if(arr[0].brand == "Snack"){
    header = `
      <div class="lable">
        <h1>Snack</h1>
      </div>
    `;
  }
  for(let i = 0;count < 8 && count < arr.length;i++){
    s += `<div class="product-item"  onclick="innerDetail(this)">
            <div class="product-top">
                <img  class="product-thumb" src="${arr[i].img}" alt="">
                <a href="" class="product-name">${arr[i].name}</a>
            </div>
            <div class="product-info">
              <div class="product-price">${addDot(arr[i].price.split(""))} VND</div>
              <a href="#" onclick="confirmation(this)" data-set="${arr[i].productId}" class="buy-now">Mua ngay</a>
            </div>
          </div>
          `;
    count++;
  }
  $('.innerLable').innerHTML = header;
  $('.products').innerHTML = s;
  $('.products').classList.add('list');
}

function addDot(number){
  let j = 1;
  let s = "";
  let temp = "";
  for(let i = number.length-1;i >= 0;i--){
    if(j == 9){
      s+= number[i];
    }else if(j % 3 == 0){
      s += number[i] + '.';
    }else {
      s += number[i];
    }
    j++;
  }
  return s.split("").reverse().join("");
}
let flag = 0;
function confirmation(obj){ 
  flag = 1;
  if(currentAccount != null){
    let choice;
    let list = JSON.parse(localStorage.getItem('listProduct'));
    let temp = obj.getAttribute("data-set");
    list.forEach(function(value){
      if(temp === value.productId){
        choice = value;
      }
    })
    currentAccount.push(choice)
    localStorage.setItem('currentUser', JSON.stringify(currentAccount));
    innerChoice();
  }else {
    boardLogin.classList.remove('active');
  }
}
function saveProduct(obj){
  let choice;
  let list = JSON.parse(localStorage.getItem('listProduct'));
  let temp = obj.getAttribute("data-set");
  list.forEach(function(value){
    if(temp === value.productId){
      choice = value;
    }
  })
  currentAccount.push(choice)
  localStorage.setItem('currentUser', JSON.stringify(currentAccount));
}
function requireLogin(){
  let user = JSON.parse(localStorage.getItem('currentUser'))
  if(user !== null){
    innerChoice();
    // total();
  }else {
    boardLogin.classList.remove('active');
  }
}
function searchBox(){
  let tempSearch;
  let tempString;
  let tempArr = [];
  let i = 0, j = 0;
  $('#search').onchange = function(){
    tempSearch = this.value;
    // for(i = 0;i < productArr.length;i++){
    //   tempString = productArr[i].name.split(" ");
    //   for(j = 0;j < tempString.length;j++){
    //     if(tempSearch == tempString[j].toLowerCase()){
    //       tempArr.push(productArr[i]);
    //     }
    //   }
    // }
  }
  $('.icon-search').onclick = function(){
    tempSearch = tempSearch.split(" ");
    console.log(tempSearch);
    for(i = 0;i < productArr.length;i++){
      tempString = productArr[i].name.split(" ");
      for(j = 0;j < tempString.length;j++){
        tempSearch.forEach((value)=>{
          if(value == tempString[j].toLowerCase()){
            tempArr.push(productArr[i]);
          }
        });
      }
    }
    console.log(tempArr);
    listTemp = tempArr;
      
    dividePage(tempArr);
    showContent(tempArr);
    tempArr = [];
  }
}

function innerDetail(obj){
  if(flag == 0){
    let listTemp = [];
    let item;
    let code = obj.children[1].children[1].getAttribute("data-set");
    productArr.forEach((value)=>{
      if(code == value.productId){
        item = value;
      }
    })
    let string = `
    <section class="product-detail">
      <div class="product-content row">
        <div class="product-content-left row">
          <div class="product-content-left-big-img">
            <img src="${item.img}" alt="" />
          </div>
  
        </div>
        <div class="product-content-right">
          <div class="product-content-right-product-name">
            <h1>${item.name.toUpperCase()}</h1>
          </div>
  
          <div class="product-content-right-product-price">
            <p>${addDot(item.price.split(""))}<sup>đ</sup></p>
          </div>
  
          <div class="product-content-right-product-color">
            
          </div>
          <div class="quantity">
            <p style="font-weight: bold">Số lượng:</p>
            <input type="number" min="0" value="1" />
          </div>
          <div class="product-content-right-product-button">
            <button onclick="saveProduct(this)" data-set="${item.productId}">
              <i class="fas fa-shopping-cart"></i>Thêm vào giỏ hàng
            </button>
            <button onclick="confirmation(this)" data-set="${item.productId}">Mua ngay</button>
          </div>
  
          <div class="product-content-right-bottom">
            <div class="product-content-right-bottom-top">&#8744;</div>
  
            <div class="product-content-right-bottom-content-big">
              <div class="product-content-right-bottom-content-title">
                <div
                  class="
                    product-content-right-bottom-content-title-item
                    chitiet
                  "
                >
                  <p>Chi tiết sản phẩm</p>
                </div>
                <div
                  class="
                    product-content-right-bottom-content-title-item
                    muahang
                  "
                >
                  <p>Chính sách thanh toán</p>
                </div>
              </div>
              <div class="product-content-right-bottom-content">
                <div class="product-content-right-bottom-content-chitiet">
                  <span class="detail">Xuất xứ:</span><span> Châu Âu</span
                  ><br /><br />
                  <span Class="detail">Nguyên liệu nấu</span><span>: Tươi ngon</span
                  ><br /><br />
                  <span Class="detail">Đầu bếp 5 sao nấu:</span><span> Gordon </span
                  ><br /><br />
                  <span Class="detail">Best-seller</span><span> 0_0 </span>
                </div>
                <div class="product-content-right-bottom-content-muahang">
                  <span class="detail">1. Thanh toán khi nhận hàng (COD)</span
                  ><br /><br /><span>
                    Quý khách có thể hoàn thành đặt mua hàng trên website
                    https://taoviet.vn , Với phương thức thanh toán này, quý
                    khách trả tiền mặt cho nhân viên giao hàng COD ngay khi
                    nhận được đơn hàng của mình. Chúng tôi chấp nhận hình thức
                    thanh toán khi nhận hàng (COD) cho tất cả các đơn hàng
                    trên toàn quốc.</span
                  ><br /><br />
  
                  <span class="detail"
                    >2. Thanh toán bằng tiền mặt tại cửa hàng</span
                  ><br /><br /><span
                    >Quý khách hàng có thể thanh toán bằng tiền mặt tại hệ
                    thống cửa hàng của Táo Việt hoặc Thanh toán cho nhân viên
                    giao nhận trước khi nhận hàng (đối với trường hợp giao
                    hàng tận nơi trong nội thành TpHCM).</span
                  ><br /><br />
  
                  <span class="detail">3. Thanh Toán bằng thẻ ngân hàng</span
                  ><br /><br /><span
                    >Áp dụng các thẻ ngân hàng nội địa, thẻ quốc tế hoặc các
                    loại thẻ tín dụng (Visa/ Mastercard) ...</span
                  ><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  `;
    $('.products').innerHTML = string;
    $('.slider').style.display = "none";
    $('.innerLable').style.display = "none";
    $('.page').style.display = "none";
    handleDetail();
  }
  flag = 0;
}
function handleDetail(){
	const bigImg = document.querySelector(".product-content-left-big-img img")
	const smallImg = document.querySelectorAll(".product-content-left-small-img img")
	smallImg.forEach(function (imgItem, X){
		imgItem.addEventListener("click", function () {
			bigImg.src = imgItem.src
		})
	})
	
	const chitiet = document.querySelector(".chitiet")
	const muahang = document.querySelector(".muahang")
	if (chitiet) {
		chitiet.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-chitiet").style.display = "block"
			document.querySelector(".product-content-right-bottom-content-muahang").style.display = "none"
		})
	}
	if (muahang) {
		muahang.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-chitiet").style.display = "none"
			document.querySelector(".product-content-right-bottom-content-muahang").style.display = "block"
		})
	}
	
	const butTon = document.querySelector(".product-content-right-bottom-top")
	if (butTon) {
		butTon.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-big").classList.toggle("activeB")
		})
	}
}



textAnimation();
handleEvent();
checkRegister();
checkLogin();
renderAccount();
searchBox();