const PlanningPokerOptionsComponent = ({ category, planningPokerOptions, onOptionSelect, selections }) => {
  return (
    <div className="btn-group-vertical mt-2">
      {planningPokerOptions.map((option, index) => (
        selections[category] === option ? (
          <button key={index} type="button" className="btn btn-primary btn-sm" onClick={() => onOptionSelect(category, option)}>
            {option === '?' && <ion-icon name="help"></ion-icon>}
            {option === '∞' && <ion-icon name="infinite"></ion-icon>}
            {option === 'Coffee Cup' && <ion-icon name="cafe"></ion-icon>}
            {!(option === '?' || option === '∞' || option === 'Coffee Cup') && option}
          </button>
        ) : (
          <button key={index} type="button" className="btn btn-outline-primary btn-sm" onClick={() => onOptionSelect(category, option)}>
            {option === '?' && <ion-icon name="help"></ion-icon>}
            {option === '∞' && <ion-icon name="infinite"></ion-icon>}
            {option === 'Coffee Cup' && <ion-icon name="cafe"></ion-icon>}
            {!(option === '?' || option === '∞' || option === 'Coffee Cup') && option}
          </button>
        )
      ))}
    </div>
  );
};

export default PlanningPokerOptionsComponent;
