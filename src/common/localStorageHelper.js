// 本地储存的名字
const KEY = "goods";



export const getLocalGoodsObj = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

// 按需导出
export const addLocalGoods = (goods)=>{
    
    const localGoodsObj = getLocalGoodsObj()

    if(localGoodsObj[goods.goodsId]){
        localGoodsObj[goods.goodsId] += goods.count
    }else{
        localGoodsObj[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY, JSON.stringify(localGoodsObj));

    return getTotalLocalCount();
}

export const getTotalLocalCount = ()=>{
    const localGoodsObj = getLocalGoodsObj();

    let totalCount = 0;

    for(const key in localGoodsObj){
        totalCount += localGoodsObj[key]
    }
    return totalCount
};
export const updataLocalGoods =(goods)=>{
    const localGoodsObj = getLocalGoodsObj();

     localGoodsObj[goods.goodsId] =goods.count 

    localStorage.setItem(KEY, JSON.stringify(localGoodsObj));

    return getTotalLocalCount();
}
export const deleteLocalGoods =(goodsId)=>{
    const localGoodsObj = getLocalGoodsObj();

    delete localGoodsObj[goodsId]
    
    localStorage.setItem(KEY, JSON.stringify(localGoodsObj));

    return getTotalLocalCount();
}