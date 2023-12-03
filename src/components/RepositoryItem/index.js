import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {name, issuesCount, starsCount, forksCount, avatarUrl} = item
  return (
    <li className="item-card">
      <img src={avatarUrl} alt={name} className="item-image" />
      <h1 className="name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p className="count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
