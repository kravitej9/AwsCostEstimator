document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#applicationType").addEventListener("change", showQuestions);
    document.querySelectorAll('input[name="awsComponents"]').forEach(componentCheckbox => {
        componentCheckbox.addEventListener("change", showComponentQuestions);
    });
});

const awsComponentPricing = {
    "rds": {
    "instancetype": {
        "name": "db.m5large(2vcpus,8gib)",
        "price": "67.68"
    },
    "databaseengine": {
        "name": "oracle",
        "price": "0"
    },
    "storage": {
        "name": "gp2,100gb",
        "price": "11.5"
    },
    "backup-storage": {
        "name": "7dayretention",
        "price": "2.33"
    },
    "datatransfer": {
        "name": "100gboutbound",
        "price": "10"
    }
},
"KMS": {
    "ckms": {
        "name": "5keys",
        "price": "5"
    },
    "encryption": {
        "name": "1000requests",
        "price": "0.03"
    },
    "decryption": {
        "name": "1000requests",
        "price": "0.03"
    }
},
"lambda": {
    "noofrequests": {
        "name": "1000000",
        "price": "0"
    },
    "executiontime": {
        "name": "100ms",
        "price": "0"
    },
    "memory": {
        "name": "128gb",
        "price": "0"
    }
},
"backupvault": {
    "coldstorage": {
        "name": "500gb",
        "price": "10"
    },
    "warmstorage": {
        "name": "200gb",
        "price": "5"
    },
    "retrival": {
        "name": "50gb",
        "price": "1"
    }
},
"ec2instance": {
    "instancetype": {
        "name": "t2.micro",
        "price": "7.792"
    }
},
"ebs": {
    "size": {
        "name": "gp3(50gb)",
        "price": "4"
    }
},
"cloudwatch": {
    "logdataingestion": {
        "name": "50GB",
        "price": "25"
    },
    "logdatastorage": {
        "name": "100GB",
        "price": "3"
    }
},
"secrets-manager": {
    "secretsstored": {
        "name": "10",
        "price": "4"
    },
    "APIRequests": {
        "name": "100,000",
        "price": "0.5"
    },
},
"s3": {
    "standard": {
        "name": "50gb",
        "price": "3.2"
    },
    "GETrequests": {
        "name": "1000",
        "price": "0.4"
    },
    "PUTrequests": {
        "name": "1000",
        "price": "5"
    }
},
"ALB": {
    "fixedcost": {
        "name": "fixed",
        "price": "16.2"
    },
    "datatransferout": {
        "name": "100GB",
        "price": "8.91"
    },
},
"NLB": {
    "fixedcost": {
        "name": "fixed",
        "price": "16.2"
    },
    "datatransferout": {
        "name": "100GB",
        "price": "9"
    },
},
"ECS": {
    "EC2instance": {
        "name": "2(t2.micro)",
        "price": "16.7"
    },
    "datatransfer": {
        "name": "100GB",
        "price": "9"
    },
}

};

function showQuestions() {
    const applicationType = document.querySelector("#applicationType").value;
    document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
    document.querySelector("#step1").style.display = 'block';
    document.querySelector("#selectedApplicationType").innerText = `Selected Application Type: ${applicationType}`;
    document.querySelector("#selectedApplicationType").style.display = 'block';

    if (applicationType === "web") {
        document.querySelector("#componentSelection").style.display = 'block';
    } else if (applicationType === "mobile") {
        document.querySelector("#mobileQuestions").style.display = 'block';
    }
}

function showComponentQuestions() {
    document.querySelector("#componentQuestions").style.display = 'block';
    document.querySelectorAll('.component-question').forEach(question => question.style.display = 'none');

    if (document.querySelector("#componentEC2").checked) {
        document.querySelector("#ec2Questions").style.display = 'block';
    }
    if (document.querySelector("#componentS3").checked) {
        document.querySelector("#s3Questions").style.display = 'block';
    }
    if (document.querySelector("#componentRDS").checked) {
        document.querySelector("#rdsQuestions").style.display = 'block';
    }
    // Add more conditions for other components
}

function calculateEstimate() {
    const applicationType = document.querySelector("#applicationType").value;
    let estimate = 0;
    let summaryText = `Application Type: ${applicationType}\n`;

    if (applicationType === "web") {
        if (document.querySelector("#componentEC2").checked) {
            const ec2InstanceType = document.querySelector("#ec2InstanceType").value;
            const ec2InstanceCount = parseInt(document.querySelector("#ec2InstanceCount").value);
            estimate += ec2InstanceCount * 50; // Example calculation
            summaryText += `EC2 Instance Type: ${ec2InstanceType}, Count: ${ec2InstanceCount}\n`;
        }
        if (document.querySelector("#componentS3").checked) {
            const s3StorageAmount = parseInt(document.querySelector("#s3StorageAmount").value);
            const s3AccessFrequency = document.querySelector("#s3AccessFrequency").value;
            estimate += s3StorageAmount * (s3AccessFrequency === "frequent" ? 0.023 : 0.0125); // Example calculation
            summaryText += `S3 Storage: ${s3StorageAmount} GB, Access Frequency: ${s3AccessFrequency}\n`;
        }
        if (document.querySelector("#componentRDS").checked) {
            const rdsInstanceName = awsComponentPricing["rds"]["instancetype"].name;
            const rdsPrice = Number(awsComponentPricing["rds"]["instancetype"].price);
            estimate += rdsPrice; // Adding RDS price to the estimate
            summaryText += `RDS Instance: ${rdsInstanceName}, Price: $${rdsPrice}\n`;
        }
        // Add more calculations for other components
    } else if (applicationType === "mobile") {
        const numberOfUsers = parseInt(document.querySelector("#numberOfUsers").value);
        const monthlyDataTransfer = parseInt(document.querySelector("#monthlyDataTransfer").value);
        const pushNotifications = document.querySelector("#pushNotifications").value;
        const platform = document.querySelector("#platform").value;

        estimate += numberOfUsers * 0.01 + monthlyDataTransfer * 0.02; // Example calculation
        if (pushNotifications === "yes") {
            estimate += numberOfUsers * 0.005; // Example calculation
        }
        summaryText += `Number of Users: ${numberOfUsers}, Monthly Data Transfer: ${monthlyDataTransfer} GB, Push Notifications: ${pushNotifications}, Platform: ${platform}\n`;
    }

    document.querySelector("#budgetSummary").style.display = 'block';
    document.querySelector("#summaryText").innerText = `${summaryText}Estimated Monthly Cost: $${estimate.toFixed(2)}`;
}
