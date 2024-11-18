const Tabs = (props) => {
    return (
      <>
        {props.tabs_heading.map((item, index) => {
          return (
            <div key={index + 1} className="text-xl">
              {item.selected == true ? (
                <>
                  <button
                    onClick={() => {
                      props.action(item.id);
                    }}
                    key={index}
                    className="flex-grow p-4 text-blue text-primary borderBottom"
                    style={{
                      borderBottom : "1px solid blue"
                    }}
                  >
                    {item.value}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      props.action(item.id);
                    }}
                    key={index}
                    className="flex-grow p-4"
                  >
                    {item.value}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </>
    );
  };
  
  export default Tabs;
  