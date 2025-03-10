export function handleSystemActions(actions = []) {
    if (!Array.isArray(actions)) return;
  
    actions.forEach(action => {
      switch (action) {
        case "report_to_nurse":
          // Implement nurse alert logic here
          console.log("System Action: Reporting to nurse.");
          break;
        case "view_nearby_hospitals":
          // Implement logic to fetch nearby hospitals
          console.log("System Action: Fetching nearby hospitals.");
          break;
        case "view_nearby_professionals":
          // Implement logic to fetch nearby professionals
          console.log("System Action: Fetching nearby professionals.");
          break;
        default:
          console.warn(`Unknown system action: ${action}`);
      }
    });
  }
  