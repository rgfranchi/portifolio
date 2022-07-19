export const ContentWrapper = ({ topBar, container, footer }) => {
  return (
    <div id="content-wrapper" className="content-wrapper d-flex flex-column">
      {/** Main Content */}
      <div id="content">
        {/** TopBar */}
        {topBar}
        {/** Begin Page Content */}
        {container}
        {/** Footer */}
        {footer}
      </div>
    </div>
  );
};
