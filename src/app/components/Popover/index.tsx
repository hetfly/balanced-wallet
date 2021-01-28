import React, { useCallback, useState } from 'react';

import { Placement } from '@popperjs/core';
import Portal from '@reach/portal';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

import useInterval from 'hooks/useInterval';

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.bg4};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text1};
  border-radius: 8px;
`;

const ReferenceElement = styled.div`
  display: inline-block;
`;

const Arrow = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;

  ::before {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: -1;

    content: '';
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.primary};
  }

  &.arrow-top {
    bottom: -5px;
  }

  &.arrow-bottom {
    top: -5px;
  }

  &.arrow-left {
    right: -5px;
  }

  &.arrow-right {
    left: -5px;
  }
`;

export interface PopoverProps {
  content: React.ReactNode;
  show: boolean;
  children: React.ReactNode;
  placement?: Placement;
}

export default function Popover({ content, show, children, placement = 'auto' }: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });
  const updateCallback = useCallback(() => {
    update && update();
  }, [update]);
  useInterval(updateCallback, show ? 100 : null);

  return (
    <>
      <ReferenceElement ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        <PopoverContainer show={show} ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
          <ContentWrapper>{content}</ContentWrapper>
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement as any}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </>
  );
}

export interface PopperProps {
  anchorEl: HTMLElement | null;
  show: boolean;
  children: React.ReactNode;
  placement?: Placement;
}

export function Popper({ show, children, placement = 'auto', anchorEl }: PopperProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, update, attributes } = usePopper(anchorEl, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

  const updateCallback = useCallback(() => {
    update && update();
  }, [update]);
  useInterval(updateCallback, show ? 100 : null);

  return (
    <Portal>
      <PopoverContainer show={show} ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
        <ContentWrapper>{children}</ContentWrapper>
        <Arrow
          className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
          ref={setArrowElement as any}
          style={styles.arrow}
          {...attributes.arrow}
        />
      </PopoverContainer>
    </Portal>
  );
}
