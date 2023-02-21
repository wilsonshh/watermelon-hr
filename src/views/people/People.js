import React, { useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import { getPeople } from 'src/api/people'
import {} from 'react-router-dom'
import PeopleDetailView from './PeopleDetailView'

const People = () => {
  const [page, setPage] = useState(1)

  // set the return info per page
  const [pageSize] = useState(10)

  // fetch data using react query and cache it in 2nd call
  const { data, status, error } = useQuery(['people', page, pageSize], () =>
    getPeople(page, pageSize),
  )

  // flag to open the details view
  const [isPeopleDetailViewOpen, setIsPeopleDetailViewOpen] = useState(false)

  // flag to set the default page id then it will be use to pass it on the details view
  const [person, setPerson] = useState(null)

  // navigate to previous page
  const onPreviousPage = () => {
    setPage(page - 1)
  }

  // navigate to the next page
  const onNextPage = () => {
    setPage(page + 1)
  }

  // navigate by page number
  const onNavigatePerPage = (pageNumber) => () => {
    setPage(pageNumber + 1)
  }

  // when click row under name column it will open close detail view drawer
  const onClickRow = (selectedPerson) => () => {
    console.log('onClickRow')
    setPerson(selectedPerson)
    setIsPeopleDetailViewOpen(true)
  }

  // close the drawer
  const onCloseDetailView = () => {
    console.log('onCloseDetailView')
    setIsPeopleDetailViewOpen(false)
  }

  //   check if the network loading after calling the api
  if (status === 'loading') {
    return (
      <CCardBody className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status"></div>
      </CCardBody>
    )
  }

  //   check if the api has error then return some information to help fix the problem
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <CRow>
        {/* a dialog use to display information after clicking name in the table */}
        {isPeopleDetailViewOpen ? (
          <PeopleDetailView
            open={isPeopleDetailViewOpen}
            onClose={onCloseDetailView}
            person={person}
          />
        ) : null}
        <CCol>
          <CCard>
            <CCardHeader>People</CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Height</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mass</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.results.map((_person, index) => (
                    <CTableRow key={index} active={_person === person}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell onClick={onClickRow(_person)} style={{ cursor: 'pointer' }}>
                        {_person.name}
                      </CTableDataCell>
                      <CTableDataCell>{_person.height}</CTableDataCell>
                      <CTableDataCell>{_person.mass}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CPagination align="center" aria-label="Page navigation example">
                <CPaginationItem onClick={onPreviousPage} disabled={data.previous === null}>
                  Previous
                </CPaginationItem>
                {Array.from({ length: data.count / pageSize }, (_, index) => (
                  <CPaginationItem
                    key={index}
                    active={index + 1 === page}
                    onClick={onNavigatePerPage(index)}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem onClick={onNextPage} disabled={data.next === null}>
                  Next
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default People
