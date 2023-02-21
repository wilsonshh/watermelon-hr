/* eslint-disable react/prop-types */
import React from 'react'
import {
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
} from '@coreui/react'

import PropTypes from 'prop-types'

const PeopleDetailView = (props) => {
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

  const detailValue = {}

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
      <COffcanvas placement="end" visible={props.open} onHide={props.onClose}>
        <COffcanvasHeader>
          <COffcanvasTitle>{props.person.name}</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={props.onClose} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <ul style={ulStyle}>
            {keysToDisplay.map((key) => (
              <li key={key} style={detailList}>
                <div style={detailTitle}>{onRemoveUnderScore(key)}:</div>
                <div style={detailValue}>{props.person[key]}</div>
              </li>
            ))}
          </ul>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

PeopleDetailView.propsTypes = {
  // id use to get people by id
  person: PropTypes.any.isRequired,
  //   open to open the view dialog
  open: PropTypes.bool.isRequired,
  //   use to close the view dialog
  onClick: PropTypes.func.isRequired,
}

export default PeopleDetailView
