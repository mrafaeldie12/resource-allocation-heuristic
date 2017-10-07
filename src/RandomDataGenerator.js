import moment from 'moment';

const resourceChartData = [
    ['1', 'Rafael Dietrich', 'Employee',
        null, null, null, 0, null],
    ['2', 'Rosemary Francisco', 'Employee',
        null, null, null, 0, null],
    ['3', 'Oliver Adams', 'Employee',
        null, null, null, 0, null],
    ['4', 'Eddie Smoke', 'Employee',
        null, null, null, 0, null],
    ['5', 'Angela Spark', 'Employee',
        null, null, null, 0, null],
    ['6', 'Robert Martin', 'Employee',
        null, null, null, 0, null],
    ['7', 'Thomas Paine', 'Employee',
        null, null, null, 0, null],
    ['8', 'Thomas Light', 'Employee',
        null, null, null, 0, null],
    ['9', 'Peter Thiel', 'Employee',
        null, null, null, 0, null],
    ['10', 'Warren Buffet', 'Employee',
        null, null, null, 0, null],
    ['11', 'Mark Zuckerberg', 'Employee',
        null, null, null, 0, null],
    ['12', 'Tim Ferris', 'Employee',
        null, null, null, 0, null]
];

resourceChartData.forEach(function (resource) {
    const fromDate = moment().add(Math.floor(Math.random() * 30) + 1, 'days');
    const toDate = moment(fromDate).add(Math.floor(Math.random() * 30) + 2, 'days');
    resource[3] = fromDate;
    resource[4] = toDate
});

module.exports.resourceDataForGantt = resourceChartData;

function parseDatesFromResourceData(resourceChartData) {
    for (let i = 0; i < resourceChartData.length; i++) {
        const resource = resourceChartData[i];

        resource[3] = new Date(resource[3]);
        resource[4] = new Date(resource[4]);
    }
}

module.exports.parseDatesFromResourceData = parseDatesFromResourceData;

function getRandomSkills() {
    const possibleSkills = ['React', 'Java', 'Web Development', 'C++', 'Angular', 'Architecture', 'Python', 'Ruby', 'C#', 'Smalltalk'];

    var numberOfSkillsToGet = Math.floor((Math.random() + 1) * 5);
    var randomSkills = [];
    for (let i = 0; i < numberOfSkillsToGet; i++) {
        var skillToAdd = possibleSkills[Math.floor(Math.random() * 100) % possibleSkills.length];
        if (randomSkills.indexOf(skillToAdd) === -1) {
            randomSkills.push(skillToAdd);
        }
    }
    return randomSkills;
}

function generateResourceData() {
    const resourceInfoList = [];

    for (let i = 0; i < resourceChartData.length; i++) {
        const resourceInfo = {};
        const resourceChartDataItem = resourceChartData[i];
        resourceInfo.id = resourceChartDataItem[0];
        resourceInfo.name = resourceChartDataItem[1];
        resourceInfo.data = resourceChartDataItem;
        resourceInfo.skills = getRandomSkills();
        resourceInfo.allocations = [
            {
                startDate : new Date(resourceChartDataItem[3]),
                endDate : new Date(resourceChartDataItem[4])
            }
        ];

        resourceInfoList.push(resourceInfo);
    }

    return resourceInfoList;
}

module.exports.resources = generateResourceData();