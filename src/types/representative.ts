export interface resultData {
    createTime:string
    uid:string
    status:number
    statusName:string
    title:string
    performanceType:string
    typeName:string
    workAt:string
    view:boolean
    myView:boolean
    canOperate:boolean
    content:string
    images:[]
}
export class InitData{
    titleFlag:number=1
    resultList:resultData[]=[
        {
            createTime:"",
            uid:'',
            status:0,
            statusName:"",
            title:"",
            performanceType:"",
            typeName:"",
            workAt:"",
            view:true,
            myView:true,
            canOperate:true,
            content:"",
            images:[]
        }

    ]
    dutyData:resultData={
        createTime:"",
        uid:'',
        status:0,
        statusName:"",
        title:"",
        performanceType:"",
        typeName:"",
        workAt:"",
        view:true,
        myView:true,
        canOperate:true,
        content:"",
        images:[] 
    }
 
    
}