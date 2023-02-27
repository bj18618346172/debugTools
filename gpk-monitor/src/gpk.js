"use strict"

const wanchain = require('./utils/wanchain');

const CheckStatus = {
    0: '---',
    1: true,
    2: false
}

async function run(groupId) {
    console.log("\r\nStoreman Group Info=====================================================================================");
    let smgGroup = await wanchain.getSmgGroupInfo(groupId);
    console.log("%O", smgGroup);
    let storemen = await wanchain.getSmgSelectedSm(groupId);
    console.log("=> Storemen");
    for (let i in storemen) {
        console.log("node %d: %s", i, storemen[i]);
    }
    console.log("\r\nGPK Group Info==========================================================================================");
    for (let grpIndex = 0; grpIndex < 4; grpIndex++) {
        let gpkGroup = await wanchain.getGpkGroupInfoByIndex(groupId, -1, grpIndex);
        console.log("%O", gpkGroup);
        if (gpkGroup.curveStatus != 'Complete') {
            console.log("\r\nGPK Curve %d (%s) Data================================================================================", grpIndex);
            let gpkPcs = await wanchain.getPolyCommit(groupId, gpkGroup.round, grpIndex, storemen);
            console.log("=> Poly Commit");
            for (let i in gpkPcs) {
                let pc = gpkPcs[i];
                let abbr = '';
                if (pc) {
                    abbr = pc.substr(0, 20) + '...' + pc.substr(-20);
                }
                console.log("node %d: %s", i, abbr);
            }
            if (gpkGroup.curveStatus == 'Negotiate') {
                console.log("=> Negotiation");
                let gpkData = await wanchain.getSijInfo(groupId, gpkGroup.round, grpIndex, storemen);
                // console.log("%O", gpkData);
                for (let i in gpkData) {
                    let src = storemen[i];
                    console.log("node %d: %s", i, src);
                    let srcData = gpkData[i];

                    //console.log(gpkData[i]);
                    ////////////////break; //Jacob
                    // jacob
                    for (let j in srcData) {
                        console.log("  to node %d", j);
                        let sij = srcData[j];
//            let encSijAbbr = sij.encSij? (sij.encSij.substr(0, 20) + '...' + sij.encSij.substr(-20)) : '---';
                        let encSijAbbr = sij.encSij ? sij.encSij : '---';
                        console.log("    encSij: %s (checked %s)", encSijAbbr, CheckStatus[sij.checkStatus]);// add Jacob
                        /*
                          if(parseInt(sij.checkStatus) !== 1){
                            console.log("    encSij: %s (checked %s)", encSijAbbr, CheckStatus[sij.checkStatus]);
                          }
                        //console.log("    encSij: %s (checked %s)", encSijAbbr, CheckStatus[sij.checkStatus]);
                        if (sij.checkStatus == 2) {
                          console.log("    sij: %s", sij.sij > 0? sij.sij : '!!!');
                        }
                        */
                    }
                    console.log("--------------------------------------------------------------------------------------\n")
                }
            }
        }
    }

}

module.exports = {
    run
}
