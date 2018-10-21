// lib imports
import React from 'react'
import styled from 'styled-components'
import { 
  compose,
  withHandlers,
  withState,
} from 'recompose'

// app imports
import {
  SearchBox,
  SearchResults,
} from './components'
import services from './services'

const { searchPeople } = services

const Search = ({ onChangeText, searchResults, loading }) => (
  <PageWrapper>
    <SearchSection>
      <SearchBox onChangeText={onChangeText}/>
      <SearchResults
        loading={loading}
        results={searchResults}
      />
    </SearchSection>

    <ShowcaseSection></ShowcaseSection>
    
  </PageWrapper>
)

const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.pageBackground};
  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
  `}
`

const SearchSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${({ theme }) => theme.palette.primary};
  ${({ theme }) => theme.media.tablet`
    max-height: 50%;
    border: none;
    border-bottom: 2px solid ${theme.palette.primary};
  `}
`

const ShowcaseSection = styled.div`
  flex: 1;
`

export default compose(
  withState('searchResults', 'updateResults', []),
  withState('loading', 'toggleLoading', false),
  withHandlers({
    onChangeText: props => async value => {
      props.toggleLoading(true)
      const results = await searchPeople(value)
      props.updateResults(results)
      props.toggleLoading(false)
    }
  }),
)(Search)
