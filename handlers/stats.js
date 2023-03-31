import os from "node:os";
import logger from "../configs/logconfig.js";
import HttpStatus from "http-status-codes";

function getUptime() {
    return `${os.uptime()} S`
}

function getMemInfo() {
    return `${(os.freemem()/(1024*1024*1024)).toFixed(2)} GB`
}

function getCPUUsage() {
    let cpus = os.cpus()
    let total_usage = 0
    const total_cpu = cpus.length
    for (let cpu of cpus ) {
        total_usage = cpu.times.user + cpu.times.sys
    }
    return `${total_usage/total_cpu}`
}

export function getstats (req, res) {
    let req_id = req.headers['x-request-id']
    logger.info(`Generating stat info for request id ${req_id}`)
    let resobj = {
        data : {uptime : getUptime(),
            free_mem:  getMemInfo(),
            cpu_usage: getCPUUsage()
        },
        request_id : req_id
    }
    res.setHeader('content-type', 'application/json');
    res.status(HttpStatus.OK)
    res.send(JSON.stringify(resobj))
}