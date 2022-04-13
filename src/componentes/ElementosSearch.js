import styled from "styled-components";

const ContenedorSearch = styled.form`
    width: 100%;
    display: flex;
    position: relative;

`

const InputSearch = styled.input`
    width: 100%;
    padding:1rem .6rem;
    border-radius: 20px;
    border:2px solid #4c4c4c;
    outline: 0;
    background:#202020;
    color:#fff;
    transition: border .2s;
    &:focus {
        border:2px solid #603d44;
    }
`

const ButtonSearch = styled.button`
    position: absolute;
    right: 0;
    padding:1rem .6rem;
    background:none;
    border: 0;
    cursor: pointer;
`

export {ContenedorSearch, InputSearch, ButtonSearch};