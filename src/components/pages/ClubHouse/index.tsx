import * as React from "react";
import { ClubhouseCard } from "@atoms/ClubhouseCard";
import PlusIcon from "@heroicons/outline/plus.svg";
import { ButtonHTMLAttributes, useCallback, useEffect, useState } from "react";
import { Api } from "@src/api/Kis";
import { Modal, ModalProps, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Button from "@atoms/button";
import { useStoreState } from "@src/hooks";
import LoadingContainer from "@src/components/atoms/LoadingContainer";

interface IDashboardTinderProps {}

const AddButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <button
      {...props}
      className="rounded-full fixed bottom-4 right-2 p-3 bg-pink-500"
    >
      <PlusIcon className="h-6 w-6 text-white" />
    </button>
  );
};

const AddNewModal: React.FC<
  Omit<ModalProps, "children" | "onClose"> & { onClose: () => void }
> = ({ onClose, ...props }) => {
  const id = useStoreState((store) => store.id);
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = new Api(id);
    api.tags().then(({ data }) => setTags(data));
  }, []);

  const onModalClose = useCallback(() => {
    setTitle("");
    setSelectedTags([]);
    setLoading(false);
    onClose();
  }, [onClose]);

  const onCreateClick = useCallback(async () => {
    setLoading(true);
    const api = new Api(id);
    const res = await api.createTopic({
      name: title,
      topic_tags_attributes: selectedTags.map(({ id }) => ({ tag_id: id })),
    });
    if (res.status === 201 || res.status === 200) {
      onModalClose();
    }
  }, [selectedTags, title, onModalClose]);

  return (
    <Modal
      onClose={onModalClose}
      {...props}
      className="flex justify-center items-center"
    >
      <div className="bg-white border-0 outline-none w-11/12 p-6 rounded">
        <p className="mb-2">???????????????????? ?????????? ??????????????</p>
        <div className="mb-2">
          <TextField
            label="???????????????? ??????????????"
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
          renderInput={(params) => <TextField {...params} label="????????" />}
        />
        <Button
          loading={loading}
          disabled={loading}
          className="mt-4 mx-auto px-8"
          onClick={onCreateClick}
        >
          ??????????????
        </Button>
      </div>
    </Modal>
  );
};

const ClubHouse: React.FunctionComponent<IDashboardTinderProps> = (props) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const id = useStoreState((store) => store.id);

  const updateTopics = useCallback(() => {
    const api = new Api(id);
    setLoading(true);
    api
      .topics()
      .then(({ data }) => setTopics(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    updateTopics();
  }, []);

  const onModalClose = useCallback(() => {
    setOpenModal(false);
    updateTopics();
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <div className="p-2">
        {topics.map(({ name, tags, people_count, id }, index) => (
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
    </LoadingContainer>
  );
};

export default ClubHouse;
