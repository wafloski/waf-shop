import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import styled from "styled-components";

const StyledItem = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

const StyledItemTitle = styled.h3`
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.black};
    display: inline-block;
    line-height: 1.3;
    font-size: 2.4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
    width: 100%;
  }
`;

const StyledPrice = styled.span`
  background: ${props => props.theme.red};
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

const Item = ({ item }) => {
  return (
    <StyledItem>
      <StyledItemTitle>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id }
          }}
        >
          <a>{item.title}</a>
        </Link>
      </StyledItemTitle>
      <StyledPrice>{formatMoney(item.price)}</StyledPrice>
      <p>{item.description}</p>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
