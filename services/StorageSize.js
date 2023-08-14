const getStorageByType = (data, types) => {
    let totalSize = 0;
    const result = data.filter(item => types.includes(item.type));

    result.forEach(element => {
        totalSize = totalSize + element.size
    });
    return((totalSize/1024**2).toFixed(2));
}

export default{
    getStorageByType
}