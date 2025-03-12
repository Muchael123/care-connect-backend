export default function handleSystemActions(actions = []) {
  if (!Array.isArray(actions)) return;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action === "report_to_nurse") {
      console.log("System Action: Reporting to nurse.");
    } else if (action === "view_nearby_hospitals") {
      console.log("System Action: Fetching nearby hospitals.");
      
    } else if (action === "view_nearby_professionals") {
      console.log("System Action: Fetching nearby professionals.");
    } else {
      console.warn(`Unknown system action: ${action}`);
    }
  }
}
