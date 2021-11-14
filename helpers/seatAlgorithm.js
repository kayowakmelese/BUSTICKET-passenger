
 const getLeaftSeat=(leftCol, rightCol, centerSeat, column, doorBackBreak, totalSeat) =>{
    let left = [];
    let lname = []
    let rname = []
    let right = [];
    let rowLeft = [];
    let rowRight = [];
    let center = []
    let ar=[]
    let count = 0;
    let breakNo =0
    let lastCenterSeat = 0
    let leftSeatColl = 0
    let rightSeatColl = 0
    let rowNumber = 0

    if(leftCol==null||leftCol==undefined){
        leftSeatColl=0
    }else{
        leftSeatColl=parseInt(leftCol)
    }


        if(rightCol==null||rightCol==undefined){
            rightSeatColl=0
        }else{
            rightSeatColl=parseInt(rightCol)
        }

        if(centerSeat==null||centerSeat==undefined){
            lastCenterSeat=0
        }else{
            lastCenterSeat=parseInt(centerSeat)
        }


        if(column===null||column===undefined||column.length === 0){

            rowNumber=0
        }else{
            rowNumber=parseInt(column)

        }

        if(doorBackBreak==null||doorBackBreak==undefined){
            breakNo=0 
        }else{

            breakNo=parseInt(doorBackBreak)
        }





    let max = Array(rowNumber).fill(2).map(o => {
        count++
        if (left.length == 0) {
            let a = numberBet(1, parseInt(leftSeatColl))
            // console.log("number bet fist ", a)
            a.map(i => left.push(i))
            rowLeft.push(a)
            let lLast = a.slice(-1)[0]

            let b = numberBet(parseInt(lLast) + 1, parseInt(rightSeatColl) + lLast)
            // console.log("fist rnewjn ", b)
            b.map(i => right.push(i))
            b.map(i => rname.push(`R${i}`))
            rowRight.push(b)
        } else {

            if (count === breakNo) {

                let rLast = right.slice(-1)[0]
                let a = numberBet(rLast + 1, parseInt(leftSeatColl) + rLast)
                a.map(i => left.push(i))
                a.map(i => lname.push(`L${i}`))
                rowLeft.push(a)
                rowRight.push([0,0])
            } else {
                if (count === breakNo + 1) {
                    // console.log("count ", count)
                    // console.log("breakNo ", breakNo + 2)

                    let lLasta = left.slice(-1)[0]
                    // console.log("left last ", lLast)

                    let a = numberBet(lLasta + 1, parseInt(leftSeatColl) + lLasta)
                    a.map(i => left.push(i))
                    a.map(i => lname.push(`L${i}`))

                    rowLeft.push(a)

                    let lLast = left.slice(-1)[0]
                    // console.log("left last ", lLast)
                    let b = numberBet(lLast + 1, parseInt(rightSeatColl) + lLast)
                    b.map(i => right.push(i))
                    rowRight.push(b)
                    b.map(i => rname.push(`R${i}`))

                } else {
                    if (count != rowNumber) {

                        let rLast = right.slice(-1)[0]
                        let a = numberBet(rLast + 1, parseInt(leftSeatColl) + rLast)
                        a.map(i => left.push(i))
                        a.map(i => lname.push(`L${i}`))

                        rowLeft.push(a)

                        let lLast = left.slice(-1)[0]
                        // console.log("left last ", lLast)
                        let b = numberBet(lLast + 1, parseInt(rightSeatColl) + lLast)
                        b.map(i => right.push(i))
                        rowRight.push(b)
                        b.map(i => rname.push(`R${i}`))

                    } else {


                        let rLast = right.slice(-1)[0]
                        let a = numberBet(rLast + 1, parseInt(leftSeatColl) + rLast)
                        a.map(i => left.push(i))
                        a.map(i => lname.push(`L${i}`))

                        rowLeft.push(a)
                        let lLast = left.slice(-1)[0]
                        // console.log("left last ", lLast)
                        let b = numberBet(lLast + 1, parseInt(lastCenterSeat) + lLast)
                        b.map(i => center.push(i))

                        let centerLast = center.slice(-1)[0]

let c = numberBet(centerLast + 1, parseInt(rightSeatColl) + centerLast)
                        c.map(i => right.push(i))
                        c.map(i => rname.push(`R${i}`))
                        rowRight.push(c)

                        // arr.slice(-1)[0] 
                    }
                }

            }

        }
    })
    // console.log("rowLeft",rowLeft)
    // console.log("rowRight",rowRight)
    // console.log(lname)
    // console.log(rname)

    // console.log("center ", center)
    return {
        left,
        right,
        rowLeft,
        rowRight,
        center
    }


}



function numberBet(start, end) {
    var list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }
    return list
}



function NewArray(size, method, linear) {
    method = method || (i => i);
    linear = linear || false;
    var x = [];
    for (var i = 0; i < size; ++i)
        x[i] = method(linear ? i / (size - 1) : i);
    return x;
}
export {getLeaftSeat,numberBet,NewArray}