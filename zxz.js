
(function(w){
    //
    var Z = {};

    //添加方法
    
    /*
    tempalte模板方法
     */
    Z.template = function(id){

        this.tplContent = $('#'+id).html();
        this.render = function(_data){
            var self = this;
            //正则匹配${}
            var reg = new RegExp('\\$\\{[^\\{\\}]+\\}','gi');
            //模板内容匹配正则
            var arr = this.tplContent.match(reg);

            //遍历data 进行模板渲染[{},{}]
            var renderHtml = '';
            
            $.each(_data,function(i,data){
                var tplContentCopy = self.tplContent;
                $.each(arr,function(){
                    var code = this.replace(/\$\{\s*/g,'').replace(/\s*\}/g,'');
                    var rest = '';
                    try{
                        rest = eval(code);
                    }catch(e){
                        rest = '';
                    }
                    tplContentCopy = tplContentCopy.replace(this,rest)

                })
                renderHtml += tplContentCopy;
            });
            return $('#'+id).html(renderHtml);
        }

    };

    /*
    正则方法
     */
    
    //邮箱
    Z.isEmail = function(param){
        var eamil = param.toString();
        var reg = /^([a-z0-9]+[_\.]?)*[a-z0-9]+@([a-z0-9]+[_\.]?)*[0-9a-z]+\.[a-z]{2,3}$/i;
        if(!reg.test(eamil))
            return false
        else 
            return true
    }

    //手机号码
    Z.isPhone = function(param){
        var phone = param.toString();
        console.log(typeof(param))
        var reg = /^[(13)(15)(18)]{1}[0-9]{10}$/;
        if(!reg.test(phone))
            return false
        else
            return true
        debugger
    }

    //身份证
    Z.isIdnum= function(param){
        var idNum = param.toString();
        var province = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        // if(!/^[0-9]{17}[0-9x]{1}$/.test(param))
        //     return false
        //验证长度     
        var sizeVaild = /^[0-9]{17}[0-9x]{1}$/i.test(param);
        //验证省份
        var provinceVaild = province[parseInt(idNum.substr(0,2))];
        //验证生日
        var birth = idNum.substr(6,4) + '-' + idNum.substr(10,2) + '-' + idNum.substr(12,2),
            d = new Date(birth),
            birthVaild  = birth == d.getFullYear() + '-' +(d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1) + '-' + d.getDate();
        
       if(birthVaild&&sizeVaild&&provinceVaild)
            return true   
        else
            return false
    } 

    //抛出库
    window.Z = Z;
})(window)
