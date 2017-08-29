import React, { Component } from 'react';
import { Editor, Raw } from 'slate';
import './style.css';
import initialState from './state.json';

const DEFAULT_NODE = 'paragraph';

const schema = {
    nodes: {
        'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
        'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
        'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
        'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
        'list-item': props => <li {...props.attributes}>{props.children}</li>,
        'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    },
    marks: {
        bold: {
            fontWeight: 'bold'
        },
        code: {
            fontFamily: 'monospace',
            backgroundColor: '#eee',
            padding: '3px',
            borderRadius: '4px'
        },
        italic: {
            fontStyle: 'italic'
        },
        underlined: {
            textDecoration: 'underline'
        }
    }
};

class SiteEditor extends Component {
    state = {
        state: Raw.deserialize(initialState, { terse: true })
    };

    hasMark = (type) => {
        const { state } = this.state;
        return state.marks.some(mark => mark.type === type)
    };

    hasBlock = (type) => {
        const { state } = this.state;
        return state.blocks.some(node => node.type === type)
    };


    onChange = (state) =>  {
        this.setState({state})

    };

    onKeyDown = (e, data, state) => {
        if (!data.isMod) return;
        let mark;

        switch (data.key) {
            case 'b':
                mark = 'bold';
                break;
            case 'i':
                mark = 'italic';
                break;
            case 'u':
                mark = 'underlined';
                break;
            case '`':
                mark = 'code';
                break;
            default:
                return
        }
        state = state
            .transform()
            .toggleMark(mark)
            .apply();

        e.preventDefault();
        return state
    };

    onClickMark = (e, type) => {
        e.preventDefault();
        let { state } = this.state;

        state = state
            .transform()
            .toggleMark(type)
            .apply();

        this.setState({ state })
    };

    onClickBlock = (e, type) => {
        e.preventDefault();
        let { state } = this.state;
        const transform = state.transform();
        const { document } = state;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            }

            else {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
            }
        }

        // Handle the extra wrapping required for list buttons.
        else {
            const isList = this.hasBlock('list-item');
            const isType = state.blocks.some((block) => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            });

            if (isList && isType) {
                transform
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                transform
                    .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                    .wrapBlock(type)
            } else {
                transform
                    .setBlock('list-item')
                    .wrapBlock(type)
            }
        }

        state = transform.apply();
        this.setState({ state })
    };


    render() {
        return(
            <div>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        );
    }

    renderToolbar = () => {
        return (
            <div className="menu toolbar-menu">
                {this.renderMarkButton('bold', 'fa fa-bold')}
                {this.renderMarkButton('italic', 'fa fa-italic')}
                {this.renderMarkButton('underlined', 'fa fa-underline')}
                {this.renderMarkButton('code', 'fa fa-code')}
                {this.renderBlockButton('heading-one', 'fa fa-header')}
                {this.renderBlockButton('heading-two', 'fa fa-header')}
                {this.renderBlockButton('block-quote', 'fa fa-quote-left')}
                {this.renderBlockButton('numbered-list', 'fa fa-list-ol')}
                {this.renderBlockButton('bulleted-list', 'fa fa-list')}
            </div>
        )
    };

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        const onMouseDown = e => this.onClickMark(e, type);

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className={icon}></span>
            </span>
        )
    };

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = e => this.onClickBlock(e, type);

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className={icon}></span>
            </span>
        )
    };

    /**
     * Render the Slate editor.
     *
     * @return {Element}
     */

    renderEditor = () => {
        return (
            <div className="editor">
                <Editor
                    spellCheck
                    placeholder={'Enter some rich text...'}
                    schema={schema}
                    state={this.state.state}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
            </div>
        )
    }
}

export default SiteEditor;