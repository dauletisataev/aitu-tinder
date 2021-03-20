import * as React from "react";
import { ClubhouseCard } from "@atoms/ClubhouseCard";
import PlusIcon from '@heroicons/outline/plus.svg'
import {ButtonHTMLAttributes, useCallback, useEffect, useState} from "react";
import {Api} from "@src/api/Kis";
import {Modal, ModalProps, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import Button from "@atoms/button";

interface IDashboardTinderProps {}

const AddButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props} className="rounded-full fixed bottom-4 right-2 p-3 bg-pink-500">
    <PlusIcon className="h-6 w-6 text-white" />
  </button>
}

const AddNewModal: React.FC<Omit<ModalProps, 'children' | 'onClose'> & {onClose: () => void}> = ({onClose, ...props}) => {
  const api = new Api();
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.tags().then(({data}) => setTags(data));
  }, [])

  const onModalClose = useCallback(() => {
    setTitle('');
    setSelectedTags([]);
    setLoading(false);
    onClose();
  }, [onClose])

  const onCreateClick = useCallback(async () => {
    setLoading(true);
    const res = await api.createTopic({
      name: title,
      topic_tags_attributes: selectedTags.map(({id}) => ({tag_id: id}))
    });
    if(res.status === 201 || res.status === 200) {
      onModalClose();
    }
  }, [selectedTags, title, onModalClose])


  return <Modal onClose={onModalClose} {...props} className="flex justify-center items-center">
    <div className="bg-white border-0 outline-none w-11/12 p-6 rounded">
      <p className="mb-2">Добавление новой комнаты</p>
      <div className="mb-2">
        <TextField
          label="Название комнаты"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
      </div>
      <Autocomplete
        id="combo-box-demo"
        multiple
        options={tags}
        onChange={(e, value) => setSelectedTags(value)}
        value={selectedTags}
        getOptionLabel={(tag) => tag.name}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Тэги" />}
      />
      <Button
        loading={loading}
        disabled={loading}
        className="mt-4 mx-auto px-8"
        onClick={onCreateClick}
      >
        Создать
      </Button>
    </div>
  </Modal>
}

const ClubHouse: React.FunctionComponent<IDashboardTinderProps> = (props) => {
  const [topics, setTopics] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const api = new Api();

  const updateTopics = useCallback(() => {
    api.topics().then(({data}) => setTopics(data));
  }, [])

  useEffect(() => {
    updateTopics();
  }, [])

  const onModalClose = useCallback(() => {
    setOpenModal(false);
    updateTopics();
  }, [])

  return (
    <div className="p-2">
      {topics.map(({ name, tags, people_count, id}, index) => (
        <div className="mb-4" key={id}>
          <ClubhouseCard
            title={name}
            tags={tags}
            peopleCount={people_count}
          />
        </div>
      ))}
      <AddButton onClick={() => setOpenModal(true)} />
      <AddNewModal open={openModal} onClose={onModalClose} />
    </div>
  );
};

export default ClubHouse;
