class Response {
    constructor(data = null,message = null){
        this.data = data
        this.message = message
      

    }

    success(res){
        return res.status(200).json({
            success : true,
            data : this.data,
            message : this.message ?? "işlem başarılı"  //buradakı ıslem undıfend veya null ıse sag taraftakı ıslemı yapması gerektıgını soyler
            
        })
    }
    created(res){
        return res.status(200).json({
            success: true,
            data : this.data,
            message : this.message ?? "işlem Başarılı"
        })
    }

    error500(res){
        return res.status(500).json({
            success:false,//hata oldugu için  false olur
            data: this.data,
            message : this.message ?? "İŞLEM BAŞARISIZ!"
        })
    }

    error400(res){
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "İŞLEM BAŞARISIZ!"
        })
    }

    error401(res){
        return res.status(401).json({
            success:false,
            data: this.data,
            message: this.message ?? "İŞLEM LÜTFEN OTURUM AÇIN!"

        })
    }

    error404(res){
        return res.status(404).json({
            success: false,
            data : this.data,
            message : this.message ?? "İŞLEM BAŞARISIZ!"
        })
    }
    error429(res){
        return res.status(429).json({
            success : false,
            data : this.data,
            message: this.message ?? "ÇOK FAZLA İSTEK ATILDI!!"
        })
    }
}

module.exports =  Response