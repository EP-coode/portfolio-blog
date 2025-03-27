import React from 'react'

import type { CodeBlock as CodeBlockProps } from '@/payload-types'
import { CopyButton } from './CopyButton'
import { Highlight, themes } from 'prism-react-renderer'

import styles from './CodeBlock.module.css'

const CodeBlock = ({ language, code, filePath }: CodeBlockProps) => {
  return (
    <div>
      <Highlight language={language ?? 'javascript'} code={code} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <div className={styles.codeBlock}>
            <div className={styles.header}>
              <span>{filePath || '//Code'}</span> <CopyButton code={code} className={styles.copyButton} />
            </div>
            <pre>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ className: styles.codeBlockLine, line })}>
                  <span className={styles.codeBlockLineNumber}>{i + 1}</span>
                  <span className={styles.codeBlockLineContent}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock
