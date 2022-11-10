const btn = document.querySelector(".search");
const searchText = document.querySelector(".rounded-end");
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const sortSelect = document.querySelector(".sort-select");
const jsSort = document.querySelector(".js-sort-advanced");

let data = [];
let newData = [];
let count = 0;

//接API
axios.get("https://hexschool.github.io/js-filter-data/data.json")
.then(function(response){
    data = response.data;
    // console.log(data);
});

// 搜尋
function search(){
    let input = searchText.value;
    if(input == ""){
        alert("請輸入作物名稱!!!")
        return;
    };
    
    newData = data.filter(function(item){
        return item.作物名稱 == input;
    });
    console.log(newData);

    
    
    renderData();

    if(newData == ""){
        showList.innerHTML=`<tr>
        <td colspan="7" class="text-center p-3">沒有這種作物喔^＿^</td>
        <td>
      </tr>`
    }
    searchText.value = "";
};
btn.addEventListener("click", function(e){
    search();
});

// enter

searchText.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        search();
    };
});

// 快速分類
buttonGroup.addEventListener("click", function(e){
    if(e.target.getAttribute("data-type") == "N04"){
        newData = data.filter(function(item){
            return item.種類代碼 == "N04";
        });
        renderData();
    }else if(e.target.getAttribute("data-type") == "N05"){
        newData = data.filter(function(item){
            return item.種類代碼 == "N05";
        });
        renderData();
    }else if(e.target.getAttribute("data-type") == "N06"){
        newData = data.filter(function(item){
            return item.種類代碼 == "N06";
        });
        renderData();
    }
});

// 排序下拉選單
sortSelect.addEventListener("change", function(e){
    if(e.target.value == "依上價排序"){
        newData = newData.sort(function(a, b){
            return b.上價 - a.上價
        });
    }else if(e.target.value == "依中價排序"){
        newData = newData.sort(function(a, b){
            return b.中價 - a.中價
        });
    }else if(e.target.value == "依下價排序"){
        newData = newData.sort(function(a, b){
            return b.下價 - a.下價
        });
    }else if(e.target.value == "依平均價排序"){
        newData = newData.sort(function(a, b){
            return b.平均價 - a.平均價
        });
    }else if(e.target.value == "依交易量排序"){
        newData = newData.sort(function(a, b){
            return b.交易量 - a.交易量
        });
    };
    count = 1;
    renderData();
})

// 更改排列順序
jsSort.addEventListener("click", function(e){
    if(e.target.getAttribute("data-price-num") == "上價"){
        if(count == 1){
            newData = newData.sort(function(a, b){
                return a.上價 - b.上價
            });
            count = -1;
        }else if((count == -1) || (count == 0)){
            newData = newData.sort(function(a, b){
                return b.上價 - a.上價
            });
            count = 1;
        };
    }else if(e.target.getAttribute("data-price-num") == "中價"){
        if(count == 1){
            newData = newData.sort(function(a, b){
                return a.中價 - b.中價
            });
            count = -1;
        }else if((count == -1) || (count == 0)){
            newData = newData.sort(function(a, b){
                return b.中價 - a.中價
            });
            count = 1;
        };
    }else if(e.target.getAttribute("data-price-num") == "下價"){
        if(count == 1){
            newData = newData.sort(function(a, b){
                return a.下價 - b.下價
            });
            count = -1;
        }else if((count == -1) || (count == 0)){
            newData = newData.sort(function(a, b){
                return b.下價 - a.下價
            });
            count = 1;
        };
    }else if(e.target.getAttribute("data-price-num") == "平均價"){
        if(count == 1){
            newData = newData.sort(function(a, b){
                return a.平均價 - b.平均價
            });
            count = -1;
        }else if((count == -1) || (count == 0)){
            newData = newData.sort(function(a, b){
                return b.平均價 - a.平均價
            });
            count = 1;
        };
    }else if(e.target.getAttribute("data-price-num") == "交易量"){
        if(count == 1){
            newData = newData.sort(function(a, b){
                return a.交易量 - b.交易量
            });
            count = -1;
        }else if((count == -1) || (count == 0)){
            newData = newData.sort(function(a, b){
                return b.交易量 - a.交易量
            });
            count = 1;
        };
    };

    renderData();
})

// 資料更新
function renderData(){
    let str = "";
    newData.forEach(function(item, index){
        str += `<tr>
        <td colspan="1" class="p-3">${item.作物名稱}</td>
        <td colspan="1" class="p-3">${item.市場名稱}</td>
        <td colspan="1" class="p-3">${item.上價}</td>
        <td colspan="1" class="p-3">${item.中價}</td>
        <td colspan="1" class="p-3">${item.下價}</td>
        <td colspan="1" class="p-3">${item.平均價}</td>
        <td colspan="1" class="p-3">${item.交易量}</td>
      </tr>`
    });
    showList.innerHTML = str;
};