import "../../sass/Contents/ConfidiaBoard/Plans.scss"

export default function Plans() {
    const selected = "free"
  return (
    <>
      <div className="MainContentHeader">
        <h4>Your plan: {"Free"}</h4>
      </div>
      <div className="PlansContainer">
        <div className="PlanCard">
            <h4 className="CardTitle">Free</h4>
            <div className="CardPrice">0 $</div>
            <div className="CardDescription">Limited access to features:</div>
            <ul>
                <li>Single file documentation</li>
                <li>No organization</li>
                <li>Python available language</li>
                <li>Single GitHub connector</li>
            </ul>
            {
                selected === "free" ? (
                    <button className="SelectedPlan">Active</button>
                ) : (
                    <button className="ChoosePlan">Choose</button>
                )
            }
        </div>
        <div className="PlanCard">
            <h4 className="CardTitle">Basic</h4>
            <div className="CardPrice">1 $</div>
            <div className="CardDescription">Limited access to features:</div>
            <ul>
                <li>1 project</li>
                <li>1 user</li>
                <li>1 language</li>
            </ul>
            {
                selected === "basic" ? (
                    <button className="SelectedPlan">Active</button>
                ) : (
                    <button className="ChoosePlan">Choose</button>
                )
            }
        </div>
        <div className="PlanCard">
            <h4 className="CardTitle">Premium</h4>
            <div className="CardPrice">1+ $</div>
            <div className="CardDescription">Limited access to features:</div>
            <ul>
                <li>Multiple projects</li>
                <li>Organization level users</li>
                <li>Mutliple languages</li>
            </ul>
            {
                selected === "basic" ? (
                    <button className="SelectedPlan">Active</button>
                ) : (
                    <button className="ChoosePlan">Contact us</button>
                )
            }
        </div>
      </div>
    </>
  );
}
