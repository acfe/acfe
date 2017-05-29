
const setData = (param) => {
    return {
        type: 'set',
        key: param.key,
        data: param.data
    }
}

const setStaticData = (param) => {
    return {
        type: 'setStatic',
        key: param.key,
        data: param.data
    }
}

const onRefresh = () => {
    return {
        type: 'refresh'
    }
}

export {
    setData,
    setStaticData,
    onRefresh
}
