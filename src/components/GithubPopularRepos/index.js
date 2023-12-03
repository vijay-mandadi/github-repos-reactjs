import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageItem: languageFiltersData[0].id,
    isLoading: status.initial,
    itemList: [],
  }

  componentDidMount() {
    this.getLanguageItems()
  }

  activeLanguage = id => {
    const filtered = languageFiltersData.filter(each => each.id === id)
    this.setState({activeLanguageItem: filtered[0].id}, this.getLanguageItems)
  }

  getLanguageItems = async () => {
    const {activeLanguageItem} = this.state
    this.setState({isLoading: status.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageItem}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({itemList: updatedData, isLoading: status.success})
    } else {
      this.setState({isLoading: status.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositoriesListView = () => {
    const {itemList} = this.state

    return (
      <ul className="item-container">
        {itemList.map(each => (
          <RepositoryItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case status.success:
        return this.renderRepositoriesListView()
      case status.failure:
        return this.renderFailureView()
      case status.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageItem} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              item={each}
              key={each.id}
              activeLanguage={this.activeLanguage}
              isActive={each.id === activeLanguageItem}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
