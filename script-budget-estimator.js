document.addEventListener("DOMContentLoaded", function() {

const awsComponents = {
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
        const appType = document.getElementById('applicationType').value;
        const additionalQuestions = document.getElementById('additionalQuestions');
        additionalQuestions.innerHTML = '';

        if (appType === "web") {
            additionalQuestions.innerHTML = `
                <div class="question">
                    <label for="traffic">Expected Monthly Traffic Volume:</label>
                    <select id="traffic" name="traffic">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                </div>
                <div class="question">
                    <label for="complex">Deployment Complexity:</label>
                    <select id="complex" name="complex">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                </div>
                <div class="question">
                    <label for="scaling">Scaling Requirements:</label>
                    <select id="scaling" name="scaling">
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </div>
                <div class="question">
                    <label for="performance">Performance Requirements:</label>
                    <select id="performance" name="performance">
                        <option value="low">Low Latency</option>
                        <option value="high">High Latency</option>
                    </select>
                </div>
                <div class="question">
                    <label for="availability">Availability Requirements:</label>
                    <select id="availability" name="availability">
                        <option value="low">Low Availability</option>
                        <option value="high">High Availability</option>
                    </select>
                </div>
                <div class="question">
                    <label for="security">Security Requirements:</label>
                    <select id="security" name="security">
                        <option value="third">Third Party</option>
                        <option value="open">Open Source</option>
                    </select>
                </div>
                <div class="question">
                    <label for="integrate">Integration Requirements:</label>
                    <select id="integrate" name="integrate">
                        <option value="low">Low Security</option>
                        <option value="high">High Security</option>
                    </select>
                </div>
                <div class="question">
                    <label for="compliance">Compliance Requirements:</label>
                    <select id="compliance" name="compliance">
                        <option value="low">Low compliance</option>
                        <option value="high">High compliance</option>
                    </select>
                </div>
                <div class="question">
                    <label for="geo">Geographical Distribution:</label>
                    <select id="geo" name="geo">
                        <option value="global">Global</option>
                        <option value="region">Region</option>
                    </select>
                </div>
                <div class="question">
                    <label for="maintain">Maintenance Requirements:</label>
                    <select id="maintain" name="maintain">
                        <option value="manage">Managed</option>
                        <option value="region">Region</option>
                    </select>
                </div>
                <div class="question">
                    <label for="cdn">Do you need a Content Delivery Network (CDN)?</label>
                    <select id="cdn" name="cdn">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            `;

        } else if (appType === "mobile") {
            additionalQuestions.innerHTML = `
                <div class="question">
                    <label for="numberOfUsers">Estimated Number of Users:</label>
                    <input type="number" id="numberOfUsers" name="numberOfUsers" min="1" required>
                </div>
                <div class="question">
                    <label for="monthlyDataTransfer">Monthly Data Transfer (GB):</label>
                    <input type="number" id="monthlyDataTransfer" name="monthlyDataTransfer" min="1" required>
                </div>
                <div class="question">
                    <label for="pushNotifications">Use of Push Notifications:</label>
                    <select id="pushNotifications" name="pushNotifications">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div class="question">
                    <label for="platform">Platform:</label>
                    <select id="platform" name="platform">
                        <option value="ios">iOS</option>
                        <option value="android">Android</option>
                        <option value="both">Both</option>
                    </select>
                </div>
            `;
        } else if (appType === "backend") {
            additionalQuestions.innerHTML = `
                <div class="question">
                    <label for="numApiCalls">Expected Number of API Calls per Month:</label>
                    <input type="number" id="numApiCalls" name="numApiCalls" min="1" required>
                </div>
                <div class="question">
                    <label for="dataStorageBackend">Expected Data Storage (in GB):</label>
                    <input type="number" id="dataStorageBackend" name="dataStorageBackend" min="1" required>
                </div>
                <div class="question">
                    <label for="dbUsage">Do you need a Database?</label>
                    <select id="dbUsage" name="dbUsage">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div class="question">
                    <label for="caching">Do you need Caching?</label>
                    <select id="caching" name="caching">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            `;
        }

        document.getElementById('step2').style.display = 'block';
    }

    function showComponentSelection() {
    const suggestedPattern = document.getElementById('suggestedPattern');
        suggestedPattern.style.display = 'block';
        suggestedPattern.innerHTML = `Suggested Pattern : EC2 Pattern (NLB-->ALB-->EC2)`;
        const additionalQuestions = document.getElementById('additionalQuestions').children;
        let allAnswered = true;
        for (let question of additionalQuestions) {
            if (question.querySelector('input, select').value === '') {
                allAnswered = false;
                break;
            }
        }

        if (allAnswered) {
            document.getElementById('step3').style.display = 'block';
        } else {
            alert("Please answer all the questions before proceeding.");
        }
    }

    function showComponentQuestions() {
    document.getElementById(componentId).style.display = 'block';
        const selectedComponents = document.querySelectorAll('input[name="awsComponents"]:checked');
        const componentQuestions = document.getElementById('componentQuestions');
        componentQuestions.style.display = 'block';
        selectedComponents.forEach(component => {
            const componentId = component.value + 'Questions';
            document.getElementById(componentId).style.display = 'block';
        });
    }

    function calculateEstimate() {
    const applicationType = document.querySelector("#applicationType").value;
        const selectedComponents = document.querySelectorAll('input[name="awsComponents"]:checked');
//        const summaryText = document.getElementById('summaryText');
//        summaryText.innerHTML = 'Calculating...';
//        const summaryAddCom = document.getElementById('summaryAddCom');
        let totalEstimate = 30;
 let summaryText = `Application Type: ${applicationType}\n`;

        selectedComponents.forEach(component => {
            const componentKey = component.value;
            const componentInfo = awsComponents[componentKey];

            let componentEstimate = componentInfo.price;
            if (componentKey === 'ec2') {
                const instanceCount = document.getElementById('ec2InstanceCount').value;
                componentEstimate *= instanceCount;
            } else if (componentKey === 's3') {
                const storageAmount = document.getElementById('s3StorageAmount').value;
                componentEstimate *= storageAmount;
            } else if (componentKey === 'rds') {
//                const instanceCount = document.getElementById('rdsInstanceCount').value;
                const rdsInstanceName = awsComponents["rds"]["instancetype"].name;
                const rdsPrice = Number(awsComponents["rds"]["instancetype"].price);
                totalEstimate += rdsPrice; // Adding RDS price to the estimate
                summaryText += `RDS Instance: ${rdsInstanceName}, Price: $${rdsPrice}\n`;
//                componentEstimate *= instanceCount;
            } else if (componentKey === 'lambda') {
                const invocationCount = document.getElementById('lambdaInvocationCount').value;
                const executionTime = document.getElementById('lambdaExecutionTime').value;
                componentEstimate *= invocationCount * (executionTime / 1000);
            }

//            totalEstimate += componentEstimate;
        });
        document.getElementById('budgetSummary').style.display = 'block';
        document.querySelector("#summaryText").innerText = `${summaryText} Estimated Budget: $${totalEstimate.toFixed(2)}`;

    }

    window.showQuestions = showQuestions;
    window.showComponentSelection = showComponentSelection;
    window.showComponentQuestions = showComponentQuestions;
    window.calculateEstimate = calculateEstimate;
});
