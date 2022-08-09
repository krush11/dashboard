import { Avatar, Button, Code, createStyles, Group, List, Modal, Select, Tabs, Text, TextInput } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import axios from 'axios';
import { useState } from 'react';
import showErrorNotification from 'template/notifications/error';

import CheckLg from 'public/icons/check-lg.svg';
import Building from 'public/icons/building.svg';
import Tag from 'public/icons/tag.svg';
import People from 'public/icons/people.svg';
import Files from 'public/icons/files.svg';

const useStyles = createStyles(theme => ({
  inviteLink: {
    cursor: 'pointer',
    [`&:hover .copyClipboard`]: {
      fill: '#1c7ed6'
    }
  }
}))

export default function SetupModal(props) {
  let { isModalOpened, setIsModalOpened, setIsDialogOpened, step, user } = props;
  const [activeTab, setActiveTab] = useState(step);
  // company prop is not listed above with other props to avoid conflict in variable name
  const [company, setCompany] = useState(props.company);
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);
  const [invitedList, setInvitedList] = useState(company ? company.invited : []);
  const [clicked, setClicked] = useState(false);
  const [companyNameAutocomplete, setCompanyNameAutocomplete] = useState([]);
  const clipboard = useClipboard();
  const { classes } = useStyles();

  async function linkCompany(e) {
    e.preventDefault();
    setIsRequestProcessing(true);
    let element = e.target;
    let { employeeSize, companyName, userRole } = element;
    let data = {
      employeeSize: employeeSize.value,
      companyName: companyName.value,
      userRole: userRole.value
    }
    try {
      const response = await axios.post('/api/company', data);
      setCompany(response.data)
      setIsRequestProcessing(false);
      setActiveTab(1);
    } catch (err) {
      setIsRequestProcessing(false);
      showErrorNotification('Error', err.response.data.description)
    }
  }

  async function inviteTeamMember(e) {
    e.preventDefault();
    let { email } = e.target;
    let newInvite = {
      email: email.value,
      role: 'member'
    };

    try {
      await axios.post('/api/company/invite', newInvite);
      e.target.email.value = null;
      setInvitedList(v => [...v, newInvite]);
    } catch (err) {
      showErrorNotification('Error', err.response.data.description)
    }
  }

  function copyLinkToClipboard() {
    clipboard.copy(`http://mirrage.veybit.in/invite/${company._id}`);
    setClicked(true);
    setTimeout(() => setClicked(false), 2500);
  }

  async function validateSetup() {
    try {
      await axios.get(`/api/company/${company._id}/validate`);
      setIsModalOpened(false);
    } catch (err) {
      showErrorNotification('Error', err.response.data.description)
    }
  }

  return (
    <>
      <Modal opened={isModalOpened} title='ACCOUNT SETUP' size={750} radius='sm' centered
        onClose={() => { setIsModalOpened(false); setIsDialogOpened(true); }}>

        <Tabs grow tabPadding='md' orientation='vertical' active={activeTab} onTabChange={setActiveTab}
          styles={{ tabsList: { width: 'max-content' }, body: { width: '100%' } }}>
          <Tabs.Tab label='Company details' disabled={activeTab === 0 ? false : true} className='ps-0'
            icon={activeTab > 0 ?
              <CheckLg fill='lightgreen' width='20' height='20' /> : <Building width='20' height='20' />}>
            <form onSubmit={linkCompany}>
              <TextInput placeholder='Company name' name='companyName' className='mb-3'
                label='Company name' data-autofocus required />
              <span className='d-flex flex-row'>
                <Select name='employeeSize' placeholder='Employee count'
                  label="Company size" className='w-50 me-3' data={[
                    { value: 'xs', label: 'Less than 10' },
                    { value: 'sm', label: '11-50' },
                    { value: 'md', label: '51-100' },
                    { value: 'lg', label: '101-1000' },
                    { value: 'xl', label: 'More than 1000' }]} />
                <Select name='userRole' placeholder='Your role in the company'
                  label="Your role" className='w-50' data={[
                    { value: 'cexec', label: 'C-Executive' },
                    { value: 'vp', label: 'Vice President' },
                    { value: 'developer', label: 'Developer' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'other', label: 'Others' }]} />
              </span>
              <Group position='apart' className='pt-3'>
                <span />
                <Button loading={isRequestProcessing} loaderPosition='right' type='submit'>Submit</Button>
              </Group>
            </form>
          </Tabs.Tab>

          <Tabs.Tab label='Select plan' disabled={activeTab === 1 ? false : true} className='ps-0'
            icon={activeTab > 1 ? <CheckLg fill='lightgreen' width='20' height='20' /> : <Tag width='20' height='20' />}>
            Pricing now implemented yet. Directly click submit as of now <br />
            <Button loading={isRequestProcessing} loaderPosition='right' onClick={() => setActiveTab(2)}>Submit</Button>
          </Tabs.Tab>

          <Tabs.Tab label='Add team' disabled={activeTab === 2 ? false : true} className='ps-0'
            icon={activeTab > 2 ? <CheckLg fill='lightgreen' width='20' height='20' /> : <People width='20' height='20' />}>
            <Text weight='700'>Team collaboration</Text>
            <Text color='dimmed' size='sm' className='lh-sm mt-1 dimmed text-wrap'>
              Want to invite your colleagues to collaborate?<br /> Just enter their email and we will do the rest for you!!
            </Text>
            <form className='d-flex flex-row mt-2' onSubmit={inviteTeamMember}>
              <TextInput placeholder='name@domain.com' radius='md' required
                type='email' name='email' className='w-100 pe-3' />
              <Button className='py-1 text-nowrap' type='submit'>Send mail</Button>
            </form>
            <div className='my-3'>
              <Text>Invited members</Text>
              {company ? company.team.map(member => {
                return (
                  <List listStyleType='none' key={member._id}><List.Item>
                    <Group position='apart' my='sm'>
                      <Group spacing='sm'>
                        <Avatar color='cyan' radius='xl' ></Avatar>
                        <Text size='sm' >{member.user.firstName} {member.user.lastName}</Text>
                      </Group>
                      <Text size='sm' className='text-capitalize'>{member.role}</Text>
                    </Group>
                  </List.Item></List>
                )
              }) : null}
              {invitedList.map(member => {
                return (
                  <List listStyleType='none' key={member.email}><List.Item>
                    <Group position='apart' my='sm'>
                      <Group spacing='sm'>
                        <Avatar color='cyan' radius='xl' ></Avatar>
                        <Text size='sm'>{member.email}&nbsp;
                          <sup style={{ fontSize: 'xx-small', color: 'green' }}>INVITED</sup>
                        </Text>
                      </Group>
                      <Text size='sm' className='text-capitalize'>{member.role}</Text>
                    </Group>
                  </List.Item></List>
                )
              })}
            </div>
            <div className='border-top py-3'>
              <Text>Invite link</Text>
              <Text color='dimmed' size='sm' className='lh-sm mt-1 dimmed text-wrap'>
                Share this secret link to invite people to this workspace.
                Only managers can see this.
              </Text>
              <Group position='apart' className={`bg-light ${classes.inviteLink}`}
                p='md' my='sm' onClick={() => copyLinkToClipboard()}>
                {company ?
                  <Code className='disabled'>{`https://mirrage.veybit.in/invite/${company._id}`}</Code>
                  : null}
                {clicked ? <CheckLg fill='green' /> :
                  <Files className={`copyClipboard ${classes.copyClipboard}`} />}
              </Group>
              <Group position='right'>
                <Button onClick={validateSetup}>Finish setup</Button>
              </Group>
            </div>
          </Tabs.Tab>

        </Tabs>
      </Modal>
    </>
  );
}