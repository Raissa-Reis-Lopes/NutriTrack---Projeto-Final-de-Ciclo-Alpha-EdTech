export default function stateChange(urlParam, criteriaParam = {}) {
    const eventStateChange = new CustomEvent("onstatechange", {
        detail: { url: urlParam, criteria: criteriaParam },
    });

    return stateChange;
}