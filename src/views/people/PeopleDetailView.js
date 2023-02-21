import React from 'react'
import {
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
} from '@coreui/react'

import PropTypes from 'prop-types'

const PeopleDetailView = ({ person, open, onClose }) => {
  const keysToDisplay = [
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
  ]

  const ulStyle = {
    padding: 0,
    listStyleType: 'none',
  }

  const detailTitle = {
    textTransform: 'capitalize',
  }

  const detailList = {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    paddingBottom: '10px',
  }

  const onRemoveUnderScore = (name) => {
    return name.replace(/_/g, ' ')
  }

  return (
    <>
      <COffcanvas placement="end" visible={open} onHide={onClose}>
        <COffcanvasHeader>
          <COffcanvasTitle>{person.name}</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={onClose} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <ul style={ulStyle}>
            {keysToDisplay.map((key) => (
              <li key={key} style={detailList}>
                <div style={detailTitle}>{onRemoveUnderScore(key)}:</div>
                <div>{person[key]}</div>
              </li>
            ))}
          </ul>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

PeopleDetailView.propTypes = {
  person: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PeopleDetailView
