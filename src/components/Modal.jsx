import classNames from 'classnames';
import { createContext, useContext, useState } from 'react';

function Modal(props) {
  const { title, message, onCancel, onOk, content } = props;
  return (
    <div className="bg-white rounded-lg absolute max-w-[30rem] p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg">{title}</h1>
        {onCancel ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
          >
            close
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-3">
        {content ? content : <p className="">{message ?? ''}</p>}
      </div>
      <div className="flex justify-center items-center w-full space-x-3">
        {onOk ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOk();
            }}
            className="px-4 py-1 text-emerald-600"
          >
            OK
          </button>
        ) : (
          <></>
        )}
        {onCancel ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="px-4 py-1 text-red-600"
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const ModalContext = createContext({
  setModal() {},
});

function ModalProvider(props) {
  const { children } = props;

  const [modalProps, setModal] = useState({
    show: false,
    title: '',
    message: '',
  });

  return (
    <ModalContext.Provider
      value={{
        setModal,
      }}
    >
      <div
        className={classNames(
          'fixed top-0 left-0 z-[80] w-full h-screen bg-slate-600/50 backdrop-blur-sm transition-all delay-200',
          {
            block: modalProps.show,
            hidden: !modalProps.show,
          }
        )}
        onClick={() =>
          setModal({
            show: false,
          })
        }
      >
        <div className="w-full h-full relative">
          <Modal {...modalProps} />
        </div>
      </div>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
