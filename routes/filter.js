let filter_age= function (from,to,data,callback ){
    if(from>to){
        callback([]);
    }
    else{
        let data1 = [];
        let count=0;
        for(let x =0;x<data.length;x++){
            count++;
            let cu = new Date().getYear()+1900;
            let age = cu- data[x].year;
            if(age>=from&&age<=to){

                data1.push(data[x]);
            }
            if(count==data.length)
                return callback(data1);
        }
    }
};
let filter_gender= function(gender,data,callback){
    let data1=[];
    let count=0;
    for(let x =0;x<data.length;x++){
        count++;
        if(data[x].gender.toString()==gender.toString()){
            console.log(data[x].gender);
            data1.push(data[x]);
        }
        if(count==data.length)
            return callback(data1);
    }
};
let filter_enrollment = function(str,data,callback){
    let data1=[];
    let count=0;
    for(let x =0;x<data.length;x++){
        count++;
        if(data[x].enrollment.toString()==str.toString()){
            console.log(data[x].gender);
            data1.push(data[x]);
        }
        if(count==data.length)
            return callback(data1);
    }
};
let filter_aadhar = function(aadhar,data,callback){
    let data1=[];
    let count=0;
    for(let x =0;x<data.length;x++){
        count++;
        if(data[x].aadhar==aadhar){
            console.log(data[x].gender);
            data1.push(data[x]);
        }
        if(count==data.length)
            return callback(data1);
    }

};
let search= function(filter,data,callback){
    if(filter.age){
        let age = filter.age;
        filter_age(age.from,age.to,data,function(data1){
            let gender = filter.gender;
            if(filter.gender){
                filter_gender(gender.gender,data1,function(data2){

                    if(filter.aadhar){
                        let aadhar = filter.aadhar;
                        filter_aadhar(aadhar.aadhar,data2,function(data3){
                            if(filter.enrollment){
                                let enrollment= filter.enrollment;
                                filter_enrollment(enrollment.enrollment,data3,function(data4){
                                    return callback(data4);
                                });
                            }
                            else
                                return callback(data3);
                        });
                    }
                    else
                    {
                        if(filter.enrollment){
                            let enrollment= filter.enrollment;
                            filter_enrollment(enrollment.enrollment,data2,function(data3){
                                return callback(data3);
                            });
                        }
                        else
                            return callback(data2);
                    }
                });
            }
            else{
                if(filter.aadhar){
                    let aadhar = filter.aadhar;
                    filter_aadhar(aadhar.aadhar,data1,function(data2){
                        if(filter.enrollment){
                            let enrollment= filter.enrollment;
                            filter_enrollment(enrollment.enrollment,data2,function(data3){
                                return callback(data3);
                            });
                        }
                        else
                            return callback(data2);
                    });
                }
                else
                {
                    if(filter.enrollment){
                        let enrollment= filter.enrollment;
                        filter_enrollment(enrollment.enrollment,data1,function(data2){
                            return callback(data2);
                        });
                    }
                    else
                        return callback(data1);
                }

            }
        });
    }
    else{
        console.log(filter.gender);
        let gender = filter.gender;
        if(filter.gender){
            filter_gender(gender.gender,data,function(data1){

                if(filter.aadhar){
                    let aadhar = filter.aadhar;
                    filter_aadhar(aadhar.aadhar,data1,function(data2){
                        if(filter.enrollment){
                            let enrollment= filter.enrollment;
                            filter_enrollment(enrollment.enrollment,data2,function(data3){
                                return callback(data3);
                            });
                        }
                        else
                            return callback(data2);
                    });
                }
                else
                {
                    if(filter.enrollment){
                        let enrollment= filter.enrollment;
                        filter_enrollment(enrollment.enrollment,data1,function(data2){
                            return callback(data2);
                        });
                    }
                    else
                        return callback(data1);
                }
            });
        }
        else{
            if(filter.aadhar){
                let aadhar = filter.aadhar;
                filter_aadhar(aadhar.aadhar,data,function(data1){
                    if(filter.enrollment){
                        let enrollment= filter.enrollment;
                        filter_enrollment(enrollment.enrollment,data1,function(data2){
                            return callback(data2);
                        });
                    }
                    else
                        return callback(data1);
                });
            }
            else
            {
                if(filter.enrollment){
                    let enrollment= filter.enrollment;
                    filter_enrollment(enrollment.enrollment,data,function(data1){
                        return callback(data1);
                    });
                }
                else
                    return callback(data);
            }

        }
    }
};
module.exports=search;