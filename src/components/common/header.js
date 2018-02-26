import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, controls }) => {
  return (
    <div>
      <div className='header clearfix'>
        <span className='title'>{title}</span>
        {controls && controls.length > 0
          ? controls.map(control => 
              <div key={control.id}
                  className={control.positionClassName}>
                {React.createElement(control.element, control.props || null)}
              </div>
            )
          : null}
      </div>
      <hr />
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  controls: PropTypes.array,
};


export default Header;