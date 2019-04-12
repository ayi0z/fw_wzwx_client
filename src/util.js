  const formatTime = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [hour, minute, second].map(formatNumber).join(':')
  }

  const formatDate = (date, sep) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
  
    sep = sep || '-'
    return [year, month, day].map(formatNumber).join(sep)
  }
  const formatDateTime = (date, sep) => {
    sep = sep || '-'
    return formatDate(date, sep) + ' ' + formatTime(date)
  }
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  const DateFilter = (date, inter)=>{
    date = date || new Date()
    inter = inter || 0
    return formatDate(new Date(date.setDate(date.getDate() + inter)))
  }
  
  export default { formatTime, formatDate, formatDateTime, DateFilter }