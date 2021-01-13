import tools from '@/utils/tools.js'; //工具函数集

export default (Num) => {
  for(i=Num.length-1;i>=0;i--) {
    Num = Num.replace(',','')
    Num = Num.replace(' ','')
  }
  Num = Num.replace('￥','')
  if(isNaN(Num)) {
    tools.showMsg.error('请检查小写金额是否正确');
    return;
  }
  part = String(Num).split('.');
  newchar = '';
  for(i=part[0].length-1;i>=0;i--){
    if(part[0].length > 10){
      tools.showMsg.error('位数过大，无法计算');
      return '';
    }
    tmpnewchar = ''
    perchar = part[0].charAt(i);
    switch(perchar){
    case '0': tmpnewchar='零' + tmpnewchar ;break;
    case '1': tmpnewchar='壹' + tmpnewchar ;break;
    case '2': tmpnewchar='贰' + tmpnewchar ;break;
    case '3': tmpnewchar='叁' + tmpnewchar ;break;
    case '4': tmpnewchar='肆' + tmpnewchar ;break;
    case '5': tmpnewchar='伍' + tmpnewchar ;break;
    case '6': tmpnewchar='陆' + tmpnewchar ;break;
    case '7': tmpnewchar='柒' + tmpnewchar ;break;
    case '8': tmpnewchar='捌' + tmpnewchar ;break;
    case '9': tmpnewchar='玖' + tmpnewchar ;break;
    }
    switch(part[0].length-i-1){
    case 0: tmpnewchar = tmpnewchar +'元' ;break;
    case 1: if(perchar!=0){
      tmpnewchar= tmpnewchar +'拾' ;
    }break;
    case 2: if(perchar!=0){
      tmpnewchar= tmpnewchar +'佰' ;
    }break;
    case 3: if(perchar!=0){
      tmpnewchar= tmpnewchar +'仟' ;
    }break;
    case 4: tmpnewchar= tmpnewchar +'万' ;break;
    case 5: if(perchar!=0){
      tmpnewchar= tmpnewchar +'拾' ;
    }break;
    case 6: if(perchar!=0){
      tmpnewchar= tmpnewchar +'佰' ;
    }break;
    case 7: if(perchar!=0){
      tmpnewchar= tmpnewchar +'仟' ;
    }break;
    case 8: tmpnewchar= tmpnewchar +'亿' ;break;
    case 9: tmpnewchar= tmpnewchar +'拾' ;break;
    }
    newchar = tmpnewchar + newchar;
  }
  if(Num.indexOf('.')!=-1){
    if(part[1].length > 2) {
      part[1] = part[1].substr(0,2)
    }
    for(i=0;i<part[1].length;i++){
      tmpnewchar = ''
      perchar = part[1].charAt(i)
      switch(perchar){
      case '0': tmpnewchar='零' + tmpnewchar ;break;
      case '1': tmpnewchar='壹' + tmpnewchar ;break;
      case '2': tmpnewchar='贰' + tmpnewchar ;break;
      case '3': tmpnewchar='叁' + tmpnewchar ;break;
      case '4': tmpnewchar='肆' + tmpnewchar ;break;
      case '5': tmpnewchar='伍' + tmpnewchar ;break;
      case '6': tmpnewchar='陆' + tmpnewchar ;break;
      case '7': tmpnewchar='柒' + tmpnewchar ;break;
      case '8': tmpnewchar='捌' + tmpnewchar ;break;
      case '9': tmpnewchar='玖' + tmpnewchar ;break;
      }
      if(i==0){
        tmpnewchar =tmpnewchar + '角';
      }
      if(i==1){
        tmpnewchar = tmpnewchar + '分';
      }
      newchar = newchar + tmpnewchar;
    }
  }
  while(newchar.search('零零') != -1) {
    newchar = newchar.replace('零零', '零');
  }
  newchar = newchar.replace('零亿', '亿');
  newchar = newchar.replace('亿万', '亿');
  newchar = newchar.replace('零万', '万');
  newchar = newchar.replace('零元', '元');
  newchar = newchar.replace('零角', '');
  newchar = newchar.replace('零分', '');
  if (newchar.charAt(newchar.length-1) == '元' || newchar.charAt(newchar.length-1) == '角') {
    newchar = newchar+'整'
  }
  return newchar;
}
