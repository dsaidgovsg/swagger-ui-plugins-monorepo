import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import { Remarkable } from "remarkable"

const parser = new Remarkable("commonmark")
parser.block.ruler.enable(["table"])
parser.set({ linkTarget: "_blank" })

export const Markdown = ({ source, className = "", getConfigs }) => {
  if(typeof source !== "string") {
    return null
  }

  if ( source ) {
    const { useUnsafeMarkdown } = getConfigs()
    const html = parser.render(source)
    const sanitized = useUnsafeMarkdown ? html : html// sanitizer(html, { useUnsafeMarkdown })

    let trimmed

    if(typeof sanitized === "string") {
      trimmed = sanitized.trim()
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: trimmed
        }}
        className={cx(className, "renderedMarkdown")}
      />
    )
  }
  return null
}
Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
  getConfigs: PropTypes.func,
}

Markdown.defaultProps = {
  getConfigs: () => ({ useUnsafeMarkdown: false }),
}

export default Markdown
