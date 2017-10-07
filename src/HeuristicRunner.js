module.exports.runHeuristic = function (startDate, endDate, skillsSeparatedByComma) {
    let project = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        requiredCompetencies: skillsSeparatedByComma.split(",")
    };

    project.requiredCompetencies = trimSkills(project.requiredCompetencies);

    const resources = JSON.parse(window.localStorage.getItem('resources'));

    parseDatesFromResource(resources);

    let resourcesWithMatchingPercentages = [];

    for (let i = resources.length - 1; i >= 0; i--) {
        let currentResource = resources[i];

        let competencyMatchPercent = getCompetencyMatchForProjectPercentage(currentResource, project);

        let resourceAvailabilityPercent = getResourceAvailableDuringProjectPercentage(currentResource, project);

        let averagePercent = (competencyMatchPercent + resourceAvailabilityPercent) / 2;

        let resourceWithMatchingPercentage = {
            name: currentResource.name,
            skillsPercent: competencyMatchPercent.toFixed(0),
            availabilityPercent: resourceAvailabilityPercent.toFixed(0),
            totalPercent: averagePercent.toFixed(0)
        };

        resourcesWithMatchingPercentages.push(resourceWithMatchingPercentage);
    }

    return resourcesWithMatchingPercentages;
};

function trimSkills(skills) {
    for(let i = 0; i < skills.length; i++) {
        skills[i] = skills[i].trim();
    }
    return skills;
}

function parseDatesFromResource(resources) {
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];

        resource.allocations.forEach(function (allocation) {
            allocation.startDate = new Date(allocation.startDate);
            allocation.endDate = new Date(allocation.endDate);
        });
    }
}

function getCompetencyMatchForProjectPercentage(resource, project) {
    let missingCompetencies = getCompetenciesResourceHas(project.requiredCompetencies, resource.skills);

    let competencyMatchPercent = (missingCompetencies.length / project.requiredCompetencies.length) * 100;

    return competencyMatchPercent;
}

function getCompetenciesResourceHas(requiredCompetencies, resourceCompetencies) {
    let compentenciesResourceHas = [];

    for (let i = 0; i < requiredCompetencies.length; i++) {
        const requiredCompetency = requiredCompetencies[i];

        if (resourceCompetencies.indexOf(requiredCompetency) !== -1) {
            compentenciesResourceHas.push(requiredCompetency);
        }
    }
    return compentenciesResourceHas;
}

function getResourceAvailableDuringProjectPercentage(resource, project) {
    let totalProjectDays = getDifferenceInDays(project.startDate, project.endDate);

    let currentResourceTotalAllocatedDaysDuringProjectPeriod = getAlreadyAllocatedDaysInPeriod(resource, project);

    let resourceAvailableForProjectPercent = (100 * (totalProjectDays - currentResourceTotalAllocatedDaysDuringProjectPeriod)) / totalProjectDays;

    return resourceAvailableForProjectPercent;
}

function getAlreadyAllocatedDaysInPeriod(resource, project) {
    let currentResourceTotalAllocatedDays = 0;

    for (let i = resource.allocations.length - 1; i >= 0; i--) {
        let allocation = resource.allocations[i];

        if (allocation.startDate < project.endDate &&
            allocation.endDate > project.startDate) {
            let adjustedAllocationEndDate = allocation.endDate > project.endDate ? project.endDate : allocation.endDate;
            let adjustedAllocationStartDate = allocation.startDate < project.startDate ? project.startDate : allocation.startDate;

            let differenceInDays = getDifferenceInDays(adjustedAllocationStartDate, adjustedAllocationEndDate);

            currentResourceTotalAllocatedDays += differenceInDays;
        }
    }

    return currentResourceTotalAllocatedDays;
}

function getDifferenceInDays(firstDate, secondDate) {
    let timeDifference = Math.abs(firstDate.getTime() - secondDate.getTime());
    let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return differenceInDays;
}