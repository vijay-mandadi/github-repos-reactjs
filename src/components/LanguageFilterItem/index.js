// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, activeLanguage, isActive} = props
  const {id, language} = item

  const onChangeLanguage = () => {
    activeLanguage(id)
  }

  const activeBtn = isActive ? 'active-btn' : 'inactive-btn'

  return (
    <li className="listitem">
      <button type="button" className={activeBtn} onClick={onChangeLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
